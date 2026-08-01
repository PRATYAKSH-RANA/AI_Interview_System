// convert pdf to ai understandable text
import fs from 'fs'
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs'
import { askAI } from '../services/openRouter.js'
import { User } from '../models/user.model.js'
import Interview from '../models/interview.Model.js'

export const analyzeResume = async (req, res) => {
    let file = null;
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Resume file is required" })
        }
        
        file = req.file.path
        const fileBuffer = await fs.promises.readFile(file)
        const uint8Array = new Uint8Array(fileBuffer)
        const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;
        let resumeText = "";
        
        // Extract text from all pages
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const content = await page.getTextContent();

            const pageText = content.items.map(item => item.str).join(" ");
            resumeText += pageText + "\n";
        }

        resumeText = resumeText
            .replace(/\s+/g, " ")
            .trim()
        
        const messages = [
            {
                role: "system",
                content: `Extract Structured data from resume.
Return strictly JSON format without markdown ticks, code blocks, or extra commentary:
{
    "role": "string",
    "experience": "string",
    "projects": ["project1","project2"],
    "skills": ["skill1","skill2"]
}`
            },
            {
                role: "user",
                content: resumeText
            }
        ];
                
        const aiResponse = await askAI(messages)
        
        // Clean markdown code blocks if the AI model wraps the output anyway
        const cleanedResponse = aiResponse
            .replace(/^```json\s*/i, "")
            .replace(/^```\s*/, "")
            .replace(/\s*```$/, "")
            .trim();

        const parsed = JSON.parse(cleanedResponse)
        
        if (file && fs.existsSync(file)) {
            fs.unlinkSync(file)
        }

        res.json({
            role: parsed.role,
            experience: parsed.experience,
            projects: parsed.projects,
            skills: parsed.skills,
            resumeText
        })
    } catch (error) {
        console.error(error)
        if (file && fs.existsSync(file)) {
            fs.unlinkSync(file)
        }
        res.status(500).json({ message: error.message })
    }
}

export const generateQuestions = async (req, res) => {
    try{
       const {role,experience,mode,resumeText,projects,skills}=req.body
       role=role?.trim()
       experience=experience?.trim()
       mode=mode?.trim()

       if(!role||!experience||!mode){
           return res.status(400).json({message:"Role, experience, and mode are required"})
       }

       const user=await User.findById(req.userId)

       if(!user){
           return res.status(400).json({message:"User not found"})
       }
       if(user.credits<50){
           return res.status(400).json({message:"Insufficient credits need 50 credits to generate questions"})
       }
       const projectText=Array.isArray(projects) && projects.length?projects.join(","):"None";
       const skillText=Array.isArray(skills) && skills.length?skills.join(","):"None";
       const safeResumeText=resumeText?.trim()||"None"
       const userPrompt = `
        Role: ${role}
        Experience: ${experience}
        InterviewMode: ${mode}
        Projects: ${projectText}
        Skills: ${skillText}
        Resume: ${safeResumeText}`;

        if(!userPrompt.trim()){
            return res.status(400).json({message:"Prompt is empty"})
        }

        const messages = [
            {
                role: "system",
                content: `You are an AI interviewer. You will be given a resume and a prompt. 
                You will generate a list of questions to ask the candidate. 
                The questions should be clear, concise, and relevant to the resume and the prompt.
                The questions should be in a format that can be easily understood by the candidate.
                The questions should be in a format that can be understood by the candidate.
                You should ask the candidate to answer the questions in a way that demonstrates their understanding of the resume and the prompt.
                You should ask the candidate to answer the questions in a way that demonstrates their understanding of the resume and the prompt.
                

                Generate exactly 5 interview questions.

              Strict Rules:
               - Each question must contain between 15 and 25 words.
               - Each question must be a single complete sentence.
               - Do NOT number them.
               - Do NOT add explanations.
               - Do NOT add extra text before or after.
               - One question per line only.
               - Keep language simple and conversational.
               - Questions must feel practical and realistic.

               Difficulty progression:
               Question 1 → easy  
               Question 2 → easy  
               Question 3 → medium  
               Question 4 → medium  
               Question 5 → hard  

               Make questions based on the candidate role, experience,interviewMode, projects, skills, and resume details.
                `
            },
            {
                role: "user",
                content: userPrompt
            }
        ];

        const aiResponse = await askAI(messages)

        if(!aiResponse || !aiResponse.trim()) {
            return res.status(400).json({message:"AI response is empty"})
        }
        const questionsArray=aiResponse
        .split("\n")
        .map(q=>q.trim())
        .filter(q=>q.length>0)
        .slice(0,5)

        if(questionsArray.length==0){
            return res.status(500).json({message:"AI failed to generate questions"})
        }

        user.credits-=50
        await user.save()

        const interview=await Interview.create({
            userId:user._id,
            role,
            experience,
            mode,
            resumeText:safeResumeText,
            questions:questionsArray.map((q,index)=>({
                question:q,
                difficulty:["easy","easy","medium","medium","hard"][index],
                timeLimit:[60,60,90,90,120][index],
            }))
        })

        res.json({
            interviewId:interview._id,
            creditsLeft:user.credits,
            userName:user.name,
            questions:interview.questions
        });
    }catch(error){
       res.status(500).json({message:error.message})
    }
}

export const submitAnswers = async (req,res)=>{
    try{
    }catch(error){
    }
}
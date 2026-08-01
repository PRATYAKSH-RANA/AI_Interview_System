// convert pdf to ai understandable text
import fs from 'fs'
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs'
import { askAI } from '../services/openRouter.js'

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
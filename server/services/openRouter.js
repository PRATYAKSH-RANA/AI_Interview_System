//open router
//package used axios
//https://openrouter.ai/ 
//we use OpenAI: GPT-4o-mini model for this
//see docs
import axios from 'axios'

export const askAI = async (messages) => {
    try {
        if (!messsages || !Array.isArray(messages) || messages.length === 0) {
            throw new Error("Invalid messages")
        }
        const response = await axios.post("https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-4o-mini",
                messages: messages,
            },{
            headers: {
            Authorization: 'Bearer ${process.env.OPENROUTER_API_KEY}',
            'Content-Type': 'application/json',
        },});
        const content = response?.data?.choices?.[0]?.message?.content
        if (!content || !content.trim()) {
            throw new Error("No content")
        }
        return content
    } catch (error) {
        console.error("OpebRouter Error:", error.response?.data || error.message);
        throw new Error("OpenRouter API Error")
    }
}
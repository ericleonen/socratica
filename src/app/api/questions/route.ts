import OpenAI from "openai";
import { MIN_PARAGRAPH_LENGTH } from "./config";
import { segmentTextIntoSentences, generateSentenceSimilarities, generateParagraphs } from "@/utils/format";
import XenovaLM from "./XenovaLM";

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
});

export async function POST(req: Request) {
    const { text } = await req.json();
    
    const sentences = segmentTextIntoSentences(text);
    const similarities = await generateSentenceSimilarities(await XenovaLM.getInstance(), sentences);
    const paragraphs = generateParagraphs(sentences, similarities, MIN_PARAGRAPH_LENGTH);
    const questions = [];

    for (let paragraph of paragraphs) {
        if (!paragraph.content) continue;

        const socrates = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-1106",
            messages: [{
                role: "user",
                content: `Generate a comprehension question about the following text:
                          \n${paragraph.content}`
            }]
        });

        const response = socrates.choices[0].message.content;
        if (response) questions.push(response);
    }

    return Response.json({
        questions
    });
}
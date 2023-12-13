import OpenAI from "openai";
import { MIN_PARAGRAPH_LENGTH } from "./config";
import { segmentTextIntoSentences, generateSentenceSimilarities, generateParagraphs } from "@/utils/format";
import XenovaLM from "./XenovaLM";
import { Question } from "@/db/schemas";

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
});

const TEST_MODE = false;

export async function POST(req: Request) {
    const startTime = Date.now();
    let currTime = startTime;
    const { text } = await req.json();
    
    const sentences = segmentTextIntoSentences(text);
    console.log(`Segment time: ${(Date.now() - currTime)/1000}s`);
    currTime = Date.now();
    const similarities = await generateSentenceSimilarities(await XenovaLM.getInstance(), sentences);
    console.log(`Similarities time: ${(Date.now() - currTime)/1000}s`);
    currTime = Date.now();
    const paragraphs = generateParagraphs(sentences, similarities, MIN_PARAGRAPH_LENGTH);
    console.log(`Paragraphizer time: ${(Date.now() - currTime)/1000}s`);
    currTime = Date.now();
    const questions: Question[] = [];

    for (let paragraph of paragraphs) {
        if (!paragraph.content) continue;

        let response;

        if (TEST_MODE) {
            response = "Some question"
        } else {
            const socrates = await openai.chat.completions.create({
                model: "gpt-3.5-turbo-1106",
                messages: [{
                    role: "user",
                    content: `Generate a comprehension question about the following text:
                              \n${paragraph.content}`
                }]
            });
    
            response = socrates.choices[0].message.content;
        }
        
        if (response) {
            questions.push({
                question: response,
                answer: "",
                contextInterval: [paragraph.start, paragraph.end]
            });
        }
    }
    console.log(`Questions time: ${(Date.now() - currTime)/1000}s`);

    return Response.json({
        questions
    });
}
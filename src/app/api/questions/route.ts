import OpenAI from "openai";
import XenovaLM from "./XenovaLM";
import generate, { sectionify } from "./Highlighter";
import { sentencify, words2Tokens } from "@/utils/format";
import { DocumentData } from "firebase-admin/firestore";
import { db } from "../firebaseAdmin";

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
});

export async function POST(req: Request) {
    try {
        const { 
            text,
            userID,
            MIN_SECTION_LENGTH,
            CHARS_PER_COMP,
            SECTIONS_PER_BIG_IDEA
        } = await req.json();
        const tokensCost = words2Tokens(text);
        const userDoc = db.collection("users").doc(userID);
        const userData = (await userDoc.get()).data() as DocumentData;

        if (userData.tokens < tokensCost) {
            throw new Error("Not enough tokens!");
        } else {
            userDoc.update({ tokens: userData.tokens - tokensCost });
        }
        
        const sentences = sentencify(text);
        const sections = await sectionify(sentences, await XenovaLM.getInstance(), MIN_SECTION_LENGTH);
        
        const generator = generate(sections, openai, CHARS_PER_COMP, SECTIONS_PER_BIG_IDEA);
        const stream = iteratorToStream(generator);
    
        return new Response(stream);
    } catch (err) {
        console.error(err);
        return new Response();
    }
}

function iteratorToStream(iterator: any) {
    return new ReadableStream({
      async pull(controller) {
        const { value, done } = await iterator.next()
   
        if (done) {
          controller.close()
        } else {
          controller.enqueue(value)
        }
      },
    })
  }

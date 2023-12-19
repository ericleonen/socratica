import OpenAI from "openai";
import XenovaLM from "./XenovaLM";
import generate, { sectionify } from "./Highlighter";
import { sentencify } from "@/utils/format";

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
});

export async function POST(req: Request) {
    const { text } = await req.json();
    
    const sentences = sentencify(text);
    const { sections, intervals } = await sectionify(sentences, await XenovaLM.getInstance());
    
    const generator = generate(sections, intervals, openai);
    const stream = iteratorToStream(generator);

    return new Response(stream);
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

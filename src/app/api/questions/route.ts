import OpenAI from "openai";
import { TEST_MODE } from "@/config";
import { segmentTextIntoSentences, generateSentenceSimilarities, generateParagraphs } from "@/utils/format";
import XenovaLM from "./XenovaLM";

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
});

export async function POST(req: Request) {
    const { text } = await req.json();
    
    const sentences = segmentTextIntoSentences(text);
    const similarities = await generateSentenceSimilarities(await XenovaLM.getInstance(), sentences);
    const paragraphs = generateParagraphs(sentences, similarities);

    function sleep(time: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
    }

    const questionIterator = async function*() {
        for (let paragraph of paragraphs) {
            if (!paragraph.content) continue;

            let response;

            if (TEST_MODE) {
                await sleep(2000);
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
                yield JSON.stringify({
                    question: response,
                    answer: "",
                    contextInterval: [paragraph.start, paragraph.end]
                });
            }
        }
    }
    const questionStream = iteratorToStream(questionIterator());

    return new Response(questionStream);
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

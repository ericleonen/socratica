import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
});

export async function POST(req: Request) {
    const { text } = await req.json();
    const { searchParams } = new URL(req.url);
    const count = parseInt(searchParams.get("count") as string);

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        messages: [{ 
            role: "system", 
            content: `You generate ${count} comprehension questions based on a given a text and
                      always give the results as a list without numbers where each item is 
                      separated by a new line` 
        }, {
            role: "user",
            content: text
        }]
    });

    const completionRes = completion.choices[0].message.content;

    const questions = completionRes ? completionRes.split("\n") : null;

    return Response.json({
        questions
    });
}
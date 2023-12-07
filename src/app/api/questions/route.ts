export async function POST(req: Request) {
    const { text } = await req.json();
    const { searchParams } = new URL(req.url);
    const count = parseInt(searchParams.get("count") as string);

    const questions = [];

    for (let i = 1; i <= count; i++) {
        questions.push({
            question: "Question goes here...",
            segment: i
        })
    }

    return Response.json({
        questions,
        text,
    });
}
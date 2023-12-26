import OpenAI from "openai";
import { Pipeline } from "@xenova/transformers";
import { Matrix, add, dotDivide, exp, index, map, matrix, multiply, transpose, zeros } from "mathjs";
import { generateIDs, linspace } from "./helpers";
import { CHARS_PER_COMP, MIN_SECTION_LENGTH, SECTIONS_PER_BIG_IDEA, TEST_MODE } from "@/config";

function sleep(time: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    });
  }

export async function sectionify(sentences: string[], embedder: Pipeline) {
    const embeddings = (await embedder(sentences, {
        pooling: "mean",
        normalize: true
    })).tolist();

    const m = matrix(embeddings);
    const similarities = multiply(m , transpose(m));

    const x = matrix(zeros(similarities.size()));
    const N = sentences.length;

    for (let i = 0; i < N - 1; i++) {
        const replacement = similarities.subset(index(i, [i + 1, N - 1]));
        x.subset(index(i, [0, N - 2 - i]), replacement)
    }

    const weights = dotDivide(1, add(1, map(linspace(-10, 10, N), exp)) as Matrix);
    const weightedSimilarities = multiply(x, transpose(weights));

    type BabySection = {
        content: string,
        start: number,
        end: number
    }

    const babySections: BabySection[] = [];
    let currStart = 0;

    for (let i = 1; i < N - 1; i++) {
        const left = weightedSimilarities.get([i - 1]);
        const curr = weightedSimilarities.get([i]);
        const right = weightedSimilarities.get([i + 1]);

        if (curr < Math.min(left, right)) {
            babySections.push({
                content: sentences.slice(currStart, i + 1).join(""),
                start: currStart,
                end: i
            });
            currStart = i + 1;
        }
    }

    if (currStart <= N - 1) {
        babySections.push({
            content: sentences.slice(currStart, N).join(""),
            start: currStart,
            end: N - 1
        });
    }

    const sections: string[] = [];
    const intervals: [number, number][] = [];

    for (let i = 0; i < babySections.length; i++) {
        if (babySections[i].content.length < MIN_SECTION_LENGTH) {
            let content = babySections[i].content;
            let start = babySections[i].start;
            let end = babySections[i].end;

            const leftSimilarity = start > 0 ? similarities.get([start, start - 1]) : null;
            const rightSimilarity = end < N - 1 ? similarities.get([end, end + 1]) : null;
            
            if (i === 0 || (end < N - 1 && rightSimilarity > leftSimilarity)) {
                // merge continuously right
                while (i < babySections.length - 1 && content.length < MIN_SECTION_LENGTH) {
                    i++;
                    content += babySections[i].content;
                    end = babySections[i].end;
                }

                sections.push(content);
                intervals.push([start, end]);
            } else {
                // merge with previous paragraph (if there is one)
                sections[sections.length - 1] += content;
                intervals[intervals.length - 1][1] = end;
            }
        } else {
            sections.push(babySections[i].content);
            intervals.push([babySections[i].start, babySections[i].end]);
        }
    }

    return { sections, intervals };
}

export default async function* generate(
    sections: string[], openai: OpenAI
) {
    yield JSON.stringify({
        type: "textSections",
        data: sections
    });

    const numCompQuestions = sections.map(({ length }) => Math.floor(length / CHARS_PER_COMP));

    const bigIdeaIndices = [];
    for (
        let i = Math.min(SECTIONS_PER_BIG_IDEA - 1, sections.length - 1); 
        i < sections.length;
        i += SECTIONS_PER_BIG_IDEA
    ) {
        if (i + SECTIONS_PER_BIG_IDEA >= sections.length) {
            bigIdeaIndices.push(sections.length - 1);
        } else {
            bigIdeaIndices.push(i);
        }
    }

    let currBigIdeaContext = "";
    
    for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
        await sleep(1000);

        if (TEST_MODE) {
            for (let j = 0; j < numCompQuestions[sectionIndex]; j++) {
                await sleep(2000);
                yield JSON.stringify({
                    type: "newQuestion",
                    data: {
                        type: "comprehension",
                        question: "You understand this?",
                        ID: crypto.randomUUID(),
                        last: false
                    }
                });
            }

            const isBigIdea = bigIdeaIndices.includes(sectionIndex);

            await sleep(2000);
            yield JSON.stringify({
                type: "newQuestion",
                data: {
                    type: "research",
                    question: "Can you find this?",
                    ID: crypto.randomUUID(),
                    last: !isBigIdea
                }
            });

            if (isBigIdea) {
                await sleep(2000);
                yield JSON.stringify({
                    type: "newQuestion",
                    data: {
                        type: "big idea",
                        question: "What's the big idea?",
                        ID: crypto.randomUUID(),
                        last: true
                    }
                });
            }

            continue;
        }

        const section = sections[sectionIndex];

        const compGenerator = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-1106",
            messages: [{
                role: "user",
                content: numCompQuestions[sectionIndex] === 1 ? (
                    `Generate a comprehension question about the following text:\n${section}`
                ) : (
                    `Generate an enumerated list of ${numCompQuestions[sectionIndex]} comprehension
                     questions about the following text:\n${section}`
                )
                            
            }]
        });
        const compRes = compGenerator.choices[0].message.content;
        if (compRes) {
            for (const line of compRes.split("\n")) {
                if (!line) continue;

                await sleep(1000);
                yield JSON.stringify({
                    type: "newQuestion",
                    data: {
                        type: "comprehension",
                        question: line.replace(`${parseInt(line)}.`, "").trim(),
                    }
                });
            }
        }
        
        const researchGenerator = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-1106",
            messages: [{
                role: "user",
                content: `Generate a potential research question to help me better understand
                          the following text:\n${section}`
            }]
        });
        const researchRes = researchGenerator.choices[0].message.content;
        if (researchRes) {
            yield JSON.stringify({
                type: "newQuestion",
                data: {
                    type: "research",
                    question: researchRes,
                }
            });
        }

        currBigIdeaContext += section;

        if (bigIdeaIndices.includes(sectionIndex)) {
            const bigIdeaGenerator = await openai.chat.completions.create({
                model: "gpt-3.5-turbo-1106",
                messages: [{
                    role: "user",
                    content: `Generate a big idea question to help me better understand the
                              following text:\n${currBigIdeaContext}`
                }]
            });
            const bigIdeaRes = bigIdeaGenerator.choices[0].message.content;
            currBigIdeaContext = "";

            if (bigIdeaRes) {
                yield JSON.stringify({
                    type: "newQuestion",
                    data: {
                        type: "big idea",
                        question: bigIdeaRes,
                    }
                });
            }
        }
    }
}
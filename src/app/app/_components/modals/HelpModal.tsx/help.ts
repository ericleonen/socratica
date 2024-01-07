export type HelpData = {
    text: string,
    rectangles: ({
        height: number,
        width: number,
        top: number,
        left: number
    })[]
};

const helpData: HelpData[] = [
    // 1
    {   
        text: "Hit the \"New document\" button to create a fresh document.",
        rectangles: [
            {
                height: 49.3 / 3,
                width: 327.2 / 3,
                top: 90.3 / 3,
                left: 15.1 / 3
            }
        ]
    },
    // 2
    {   
        text: "Add a title and paste in your reading text.",
        rectangles: [
            {
                height: 1007.4 / 3,
                width: 1076.6 / 3,
                top: 72.6 / 3,
                left: 360.8 / 3
            }
        ]
    },
    // 3
    {   
        text: "Hit the \"Generate questions\" button. Do not close the document while generating questions.",
        rectangles: [
            {
                height: 49.3 / 3,
                width: 299.6 / 3,
                top: 570.4 / 3,
                left: 1520.4 / 3
            }
        ]
    },
    // 4
    {   
        text: "Spend the required amount of tokens. The cost is approximately 3 tokens per 200 words.",
        rectangles: []
    },
    {   
        text: "Move through sections with the arrows at the top of the question section. Use the answer fields to respond to each of the prompts.",
        rectangles: [
            {
                height: 61.8 / 3,
                width: 480 / 3,
                top: 76.6 / 3,
                left: 1432 / 3
            },
            {
                height: 49.4 / 3,
                width: 417 / 3,
                top: 360 / 3,
                left: 1462 / 3
            }
        ]
    },
    // 5
    {   
        text: "Access your account with the account button",
        rectangles: [
            {
                height: 71.3 / 3,
                width: 219.6 / 3,
                top: 11.5 / 3,
                left: 11.6 / 3
            }
        ]
    },
    {   
        text: "Buy more tokens as needed",
        rectangles: []
    }
]

export default helpData;
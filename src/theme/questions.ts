import { QuestionType } from "@/db/schemas";
import { BookOne, Globe, ThinkingProblem } from "@icon-park/react";
import React from "react";

type Theme = {
    [type in QuestionType]: {
        icon: React.ElementType,
        text: string,
        border: string,
        background: string,
        print: string,
        focus: string,
        save: string
    }
}

export const questionTheme: Theme = {
    "comprehension": {
        icon: BookOne,
        text: "text-sky-500",
        border: "border-sky-500",
        background: "bg-sky-500/10",
        print: "bg-sky-500/40",
        focus: "focus:shadow-sky-500/20 focus:border-sky-500",
        save: "hover:bg-sky-500/20 focus:bg-sky-500/20"
    },
    "research": {
        icon: ThinkingProblem,
        text: "text-emerald-500",
        border: "border-emerald-500",
        background: "bg-emerald-500/10",
        print: "bg-emerald-500/40",
        focus: "focus:shadow-emerald-500/20 focus:border-emerald-500",
        save: "hover:bg-emerald-500/20 focus:bg-emerald-500/20"
    },
    "big idea": {
        icon: Globe,
        text: "text-violet-500",
        border: "border-violet-500",
        background: "bg-violet-500/10",
        print: "bg-violet-500/40",
        focus: "focus:shadow-violet-500/20 focus:border-violet-500",
        save: "hover:bg-violet-500/20 focus:bg-violet-500/20"
    }
}
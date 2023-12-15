import { Transition } from "@headlessui/react";
import AnswerField from "./AnswerField";
import { useFocus } from "../HyperFocusedContext";
import QuestionField from "./QuestionField";

export type QuestionProps = {
    index: number
}

export default function Question({ index }: QuestionProps) {
    const [focus, blur] = useFocus(index);

    return (
        <Transition 
            show={true}
            appear={true}
            enter="transition-opacity duration-20"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            onMouseOver={focus}
            onMouseLeave={blur}
            className="text-theme-black w-full flex flex-col shadow-md bg-theme-white rounded-md mb-10 last:mb-0"
        >
            <QuestionField index={index} />
            <AnswerField index={index} />
        </Transition>
    )
}
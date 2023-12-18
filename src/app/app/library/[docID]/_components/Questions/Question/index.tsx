import Icon from "@/theme/Icon"
import { World } from "@icon-park/react"

export type QuestionProps = {
    index: number
}

export default function Question({ index }: QuestionProps) {
    return (
        <div className="flex flex-col border-2 border-b-4 border-slate-700 rounded-md overflow-hidden">
            <div className="flex flex-col font-bold bg-violet-100 p-6 py-3 border-b-2 border-slate-700">
                <div className="text-xs text-violet-500 flex items-center tracking-wide uppercase">
                    <Icon type={World} className="mr-2 text-base"/>
                    big idea
                </div>
                <p className="text-slate-700 mt-1">How much wood does a wood chuck chuck if a wood chuck could chuck wood?</p>
            </div>
            <textarea 
                placeholder="Your answer here"
                className="bg-white flex-grow w-full resize-none focus:outline-none px-6 py-3 text-slate-700 placeholder:text-slate-700/70"
            />
        </div>
    )
}
import { useState } from "react";
import PanelResizer from "./PanelResizer";
import QuestionsNavigation from "./QuestionsNavigation";
import { useSelector } from "react-redux";
import { ResourceStatus } from "@/store/types";
import { RootState } from "@/store";
import { Question } from "@/db/schemas";
import GenerateQuestions from "./GenerateQuestions";

export default function Questions() {
    const [width, setWidth] = useState(384); // in px
    const [section, setSection] = useState(1);
    const status = useSelector<RootState, ResourceStatus>(
        state => state.doc.status
    );
    const questions = useSelector<RootState, Question[]>(
        state => state.doc.questions
    );

    return (<>
        <PanelResizer setWidth={setWidth} />
        <div 
            style={{ width: `${width}px` }}
            className="px-4 h-full border-slate-700 border-l-2 flex flex-col"
        >{
            status === "succeeded" ? <>{
                questions.length === 0 ? <GenerateQuestions /> : <>
                    <QuestionsNavigation {...{section, setSection}} />
                </>
            }</> : <>
            
            </>
        }
        </div>
    </>)
}
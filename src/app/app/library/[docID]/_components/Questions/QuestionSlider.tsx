import { useContext, useEffect } from "react"
import { HeightStateContext, WidthStateContext } from "./DimensionsContext"
import { useFocusSection, useQuestionIDs, useQuestionsGeneratingStatus } from "@/db/docs/read";
import QuestionsSection from "./QuestionsSection";
import { useSaveQuestions, useSaveText } from "@/db/docs/update";

export default function QuestionSlider() {
    const { width } = useContext(WidthStateContext);
    const { height } = useContext(HeightStateContext);
    const questionIDs = useQuestionIDs();
    const numSections = questionIDs.length;
    const focusSection = useFocusSection();
    const generatingStatus = useQuestionsGeneratingStatus();

    const saveQuestions = useSaveQuestions();
    const saveText = useSaveText();

    useEffect(() => {
        if (generatingStatus === "succeeded") {
            saveQuestions();
            saveText();
        }
    }, [generatingStatus]);

    return (
        <div
            style={{ 
                width: `${width * numSections}px`,
                height: height ? `${height}px` : "auto",
                marginLeft: `${-width * focusSection}px`
            }}
            className="flex transition-margin overflow-hidden relative"
        >{
            questionIDs.map((sectionIDs, sectionIndex) =>
                <QuestionsSection
                    key={`section_${sectionIndex}`} 
                    {...{sectionIDs}}
                    focus={focusSection === sectionIndex}
                />
            )
        }</div>
    )
}
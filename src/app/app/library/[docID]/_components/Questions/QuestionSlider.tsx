import { useContext, useEffect } from "react"
import { WidthStateContext } from "./DimensionsContext"
import { useFocusSection, useNumQuestions, useQuestionIDs, useQuestionsGeneratingStatus, useQuestionsSavingStatus } from "@/db/docs/read";
import QuestionsSection from "./QuestionsSection";
import { useSaveQuestions, useSaveText } from "@/db/docs/update";
import { useAppDispatch } from "@/store";
import { questionsActions } from "@/store/questionsSlice";

export default function QuestionSlider() {
    const { width } = useContext(WidthStateContext);
    const questionIDs = useQuestionIDs();
    const numSections = questionIDs.length;
    const focusSection = useFocusSection();
    const generatingStatus = useQuestionsGeneratingStatus();
    const numQuestions = useNumQuestions();
    const deleting = useQuestionsSavingStatus() === "deleting";

    const dispatch = useAppDispatch();
    const saveQuestions = useSaveQuestions();
    const saveText = useSaveText();

    useEffect(() => {
        if (generatingStatus === "succeeded") {
            saveQuestions();
            saveText();

            dispatch(questionsActions.setGeneratingStatus("idle"));
        }
    }, [generatingStatus]);

    useEffect(() => {
        if (deleting) {
            saveQuestions();
        }
    }, [numQuestions, deleting])

    return (
        <div
            style={{ 
                width: `${width * numSections}px`,
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
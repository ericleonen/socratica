import { useContext } from "react"
import { WidthStateContext } from "./DimensionsContext"
import { useFocusSection, useQuestionIDs } from "@/db/docs/read";
import QuestionsSection from "./QuestionsSection";

export default function QuestionSlider() {
    const { width } = useContext(WidthStateContext);
    const questionIDs = useQuestionIDs();
    const numSections = questionIDs.length;
    const focusSection = useFocusSection();

    return (
        <div
            style={{ 
                width: `${width * numSections}px`,
                marginLeft: `${-width * focusSection}px`
            }}
            className="flex transition-margin overflow-hidden"
        >{
            questionIDs.map((sectionIDs, sectionIndex) =>
                <QuestionsSection
                    key={`section_${sectionIndex}`} 
                    {...{sectionIDs, sectionIndex}}
                    focus={focusSection === sectionIndex}
                />
            )
        }</div>
    )
}
import { useFocusSection, useText } from "@/db/docs/read";
import TextSection from "./TextSection";

export default function TextDisplay() {
    const text = useText();
    const focusSection = useFocusSection();

    return (
        <div className="mt-6 w-full text-slate-700 dark:text-slate-300">{
            text.map((section, sectionIndex) => {
                const highlight = sectionIndex === focusSection;
                const firstSection = sectionIndex === 0;

                return (
                    <TextSection 
                        key={`text_section_${sectionIndex}`}
                        value={section}
                        {...{highlight, firstSection}}
                    />
                )
            })
        }</div>
    );
}
import { useFocusSection, useText } from "@/db/docs/read";
import TextSection from "./TextSection";

type TextDisplayProps = {
    forPrinting?: boolean
}

export default function TextDisplay({ forPrinting }: TextDisplayProps) {
    const text = useText();
    const focusSection = useFocusSection();

    return (
        <div className={`mt-6 w-full ${forPrinting ? "text-black" : "text-slate-700 dark:text-slate-300"}`}>{
            text.map((section, sectionIndex) => {
                const highlight = sectionIndex === focusSection && !forPrinting;
                const firstSection = sectionIndex === 0 && !forPrinting;

                return (
                    <TextSection 
                        key={`text_section_${sectionIndex}`}
                        value={section}
                        {...{highlight, firstSection, sectionIndex}}
                        forPrinting={forPrinting || false}
                    />
                )
            })
        }</div>
    );
}
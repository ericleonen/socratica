import { useFocusSection, useText } from "@/db/docs/read";
import { useEffect, useRef, useState } from "react";

type TextProps = {
    value: string,
    highlight: boolean
    firstSection: boolean
}

const Text = ({ value, highlight, firstSection }: TextProps) => {
    const spanRef = useRef<HTMLSpanElement>(null);
    const [canScroll, setCanScroll] = useState(false);

    useEffect(() => {
        setCanScroll(true);
    }, []);

    useEffect(() => {
        const span = spanRef.current;

        if (span && highlight && canScroll) {
            span.scrollIntoView({ behavior: "smooth" });
        }
    }, [highlight, canScroll]);

    return firstSection ? <>    
        <span ref={spanRef} className="absolute top-0"/> 
        <span  className={`${highlight && "bg-amber-200 font-medium"} transition-colors scroll-m-16`}
        >
            {value}
        </span>   
    </> : (
        <span 
            ref={spanRef}
            className={`${highlight && "bg-amber-200 font-medium"} transition-colors scroll-m-16`}
        >
            {value}
        </span>
    )
}

export default function TextDisplay() {
    const text = useText();
    const focusSection = useFocusSection();

    return (
        <div className="mt-6 w-full text-slate-700">{
            text.map((section, sectionIndex) => {
                const highlight = sectionIndex === focusSection;
                const firstSection = sectionIndex === 0;

                if (section.includes("\n")) {
                    const subSections = section.split("\n");

                    return subSections.map((subSection, subSectionIndex) => {
                        const key = `section_${sectionIndex}_${subSectionIndex}`;

                        if (subSection === "") {
                            if (subSectionIndex > 0 && subSections[subSectionIndex - 1] === "") {
                                return <div key={key}  className="invisible">\n</div>
                            } else {
                                return <div key={key} />;
                            }
                        } else {
                            return (
                                <Text 
                                    key={key} 
                                    value={subSection} 
                                    highlight={highlight} 
                                    firstSection={firstSection}
                                />
                            );
                        }
                    });
                } else {
                    const key = `section_${sectionIndex}`

                    return (
                        <Text 
                            key={key} 
                            value={section} 
                            highlight={highlight} 
                            firstSection={firstSection} />
                    );
                }
            })
        }</div>
    );
}
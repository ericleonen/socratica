import { useRef, useState, useEffect, useMemo } from "react";
import TextSubSection from "./TextSubSection";

type TextSectionProps = {
    value: string,
    highlight: boolean
    firstSection: boolean
}

function useScroll(highlight: boolean) {
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

    return spanRef;
}

export default function TextSection({ value, highlight, firstSection }: TextSectionProps) {
    const spanRef = useScroll(highlight);

    const parts = useMemo(() => {
        const arr = value.split("\n").flatMap((part, index) => {
            if (index === 0) {
                return part;
            } else {
                return ["\n", part];
            }
        }).filter(part => part.length > 0);

        if (firstSection) arr.unshift("\n\n");

        return arr;
    }, [value, firstSection]);

    let refUsed = false;

    return parts.map((part, index) => {
        const textSection = (
            <TextSubSection 
                key={`text_sub_section_${index}`}
                value={part}
                highlight={highlight} 
                ref={refUsed ? null : spanRef}
            />
        );

        if (part !== "\n") refUsed = true;

        return textSection;
    });
}
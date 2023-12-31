import React from "react";

type TextSubSectionProps = {
    value: string,
    highlight: boolean,
    forPrinting: boolean,
    sectionIndex: number
}

const TextSubSection = React.forwardRef(
    (props: TextSubSectionProps, ref: React.Ref<HTMLSpanElement> | null) => {
        const { value, highlight, forPrinting, sectionIndex } = props;

        if (value === "\n\n") {
            return <span ref={ref} className="absolute top-0" />;
        }
        else if (value === "\n") {
            return <div className="h-0 [&:has(+div)]:h-6"/>;
        } else {
            return (
                <span 
                    ref={ref}
                    className={`${highlight && "bg-amber-300 dark:bg-amber-300/10 font-medium"} ${highlight && !forPrinting && "dark:text-amber-300"} scroll-m-16`}
                >
                    {
                        forPrinting && ref &&
                        <mark className="bg-amber-300 font-bold mr-1 text-sm tracking-wider">{"("}SECTION {sectionIndex + 1}{")"}</mark>
                    }
                    {value}
                </span>
            );
        }
    }
)

export default TextSubSection;
import React from "react";

type TextSubSectionProps = {
    value: string,
    highlight: boolean
}

const TextSubSection = React.forwardRef(
    (props: TextSubSectionProps, ref: React.Ref<HTMLSpanElement> | null) => {
        const { value, highlight } = props;

        if (value === "\n\n") {
            return <span ref={ref} className="absolute top-0" />;
        }
        else if (value === "\n") {
            return <div className="h-0 [&:has(+div)]:h-6"/>;
        } else {
            return (
                <span 
                    ref={ref}
                    className={`${highlight && "bg-amber-200 dark:bg-yellow-600/30 dark:text-white font-medium"} scroll-m-16`}
                >
                    {value}
                </span>
            );
        }
    }
)

export default TextSubSection;
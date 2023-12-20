import { useText } from "@/db/docs/read";

export default function TextDisplay() {
    const text = useText();

    return (
        <div className="mt-6 w-full text-slate-700">{
            text.map((section, sectionIndex) => {
                if (section.includes("\n")) {
                    const subSections = section.split("\n");

                    return subSections.map((subSection, subSectionIndex) => {
                        if (subSection === "") {
                            if (subSectionIndex > 0 && subSections[subSectionIndex - 1] === "") {
                                return <div key={`section_${sectionIndex}_${subSectionIndex}`}  className="invisible">\n</div>
                            } else {
                                return <div key={`section_${sectionIndex}_${subSectionIndex}`} />;
                            }
                        } else {
                            return <span key={`section_${sectionIndex}_${subSectionIndex}`}>{subSection}</span>
                        }
                    });
                } else {
                    return <span key={`section_${sectionIndex}`}>{section}</span>
                }
            })
        }</div>
    );
}
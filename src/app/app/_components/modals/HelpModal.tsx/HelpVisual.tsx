import Image from "next/image"
import helpData, { HelpData } from "./help"

type HelpVisualProps = {
    visualData: HelpData,
    visualIndex: number
}

export default function HelpVisual({ visualData, visualIndex }: HelpVisualProps) {
    return (
        <div className="w-[640px] shrink-0">
            <p className="text-center px-3 w-full justify-center font-medium h-16 flex items-center">{visualData.text}</p>
            <div className="w-full relative border-2 border-slate-300 mt-3">
                <Image 
                    quality={100}
                    src={`/help/help_${visualIndex}.png`}
                    width={1920}
                    height={1080}
                    alt={`help visual ${visualIndex + 1}`}
                />
                {
                    visualData.rectangles.map((rectangleStyle, rectangleIndex) =>
                        <div 
                            key={`rectangle_${visualIndex}_${rectangleIndex}`}
                            style={rectangleStyle}
                            className="absolute bg-blue-500/50 animate-pulse"
                        />
                    )
                }
            </div>
        </div>
    )
}
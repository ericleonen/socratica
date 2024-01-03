import Image from "next/image"

type HelpVisualProps = {
    helpIndex: number,
    visualIndex: number
}

export default function HelpVisual({ helpIndex, visualIndex }: HelpVisualProps) {
    return (
        <div className="w-[640px] h-[360px] relative shrink-0 overflow-hidden border-2 border-slate-300">
            <Image 
                src={`/help/help_${visualIndex}.png`}
                fill
                alt={`help visual ${visualIndex + 1}`}
                className="scale-1/2"
            />
        </div>
    )
}
import HelpVisual from "./HelpVisual"
import helpData, { HelpData } from "./help"

type HelpSliderProps = {
    helpIndex: number
}

export default function HelpSlider({ helpIndex }: HelpSliderProps) {
    return (
        <div className="relative w-[640px] overflow-hidden">
            <div
                style={{
                    marginLeft: `-${helpIndex * 640}px` 
                }}
                className="transition-[margin] duration-150 flex"
            >{
                helpData.map((visualData: HelpData, visualIndex: number) => 
                    <HelpVisual {...{visualData, visualIndex}} />
                )
            }</div>
        </div>
    )
}
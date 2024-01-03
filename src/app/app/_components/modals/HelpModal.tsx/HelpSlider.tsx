import HelpVisual from "./HelpVisual"

type HelpSliderProps = {
    helpIndex: number,
    numHelp: number
}

export default function HelpSlider({ helpIndex, numHelp }: HelpSliderProps) {
    return (
        <div className="relative w-[640px] h-[360px] overflow-hidden">
            <div
                style={{
                    marginLeft: `-${helpIndex * 640}px` 
                }}
                className="transition-[margin] duration-150 flex"
            >{
                Array.from(Array(numHelp)).map((_:any, visualIndex: number) => 
                    <HelpVisual {...{helpIndex, visualIndex}} />
                )
            }</div>
        </div>
    )
}
import { useContext, useState } from "react";
import { WidthStateContext } from "./DimensionsContext";

export default function PanelResizer() {
    const { setWidth } = useContext(WidthStateContext);
    const [dragging, setDragging] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        setWidth(width => width - e.movementX);
    }

    return (
        <div
            onMouseDown={() => setDragging(true)}
            className="ml-3 shrink-0 w-[6px] h-full hover:cursor-w-resize hover:bg-amber-300/30 border-r-2 border-slate-300 dark:border-slate-700 hover:border-amber-300 relative"
        >
            { dragging && 
                <div 
                    onMouseOut={() => setDragging(false)}
                    onMouseUp={() => setDragging(false)}
                    onMouseMove={handleMouseMove}
                    className="absolute h-full top-0 left-1/2 translate-x-[-50%] w-72"
                /> 
            }
        </div>
    )
}
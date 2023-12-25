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
            className="ml-1 w-1 h-full hover:cursor-w-resize hover:bg-amber-200 relative"
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
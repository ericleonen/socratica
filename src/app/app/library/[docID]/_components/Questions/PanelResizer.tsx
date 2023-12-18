import { useState } from "react";

type PanelResizerProps = {
    setWidth: (callback: (prevWidth: number) => number) => void
}

export default function PanelResizer({ setWidth }: PanelResizerProps) {
    const [dragging, setDragging] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        setWidth(width => width - e.movementX);
    }

    return (
        <div
            onMouseDown={() => setDragging(true)}
            className="ml-1 w-1 h-full hover:cursor-w-resize hover:bg-slate-700 relative"
        >
            { dragging && 
                <div 
                    onMouseOut={() => setDragging(false)}
                    onMouseUp={() => setDragging(false)}
                    onMouseMove={handleMouseMove}
                    className="absolute h-full top-0 left-1/2 translate-x-[-50%] w-64"
                /> 
            }
        </div>
    )
}
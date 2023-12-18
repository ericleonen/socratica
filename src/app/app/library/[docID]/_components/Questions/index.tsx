import TooltipProvider from "@/components/TooltipProvider";
import Icon from "@/theme/Icon";
import PrimaryButton from "@/theme/PrimaryButton";
import SecondaryButton from "@/theme/SecondaryButton";
import { BookOpen, GlassesOne, GlassesThree, Left, Magic, Right, ThinkingProblem, World } from "@icon-park/react";
import React, { useState } from "react";

export default function Questions() {
    const [width, setWidth] = useState(384); // in px
    const [dragging, setDragging] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        setWidth(width => width - e.movementX);
    }

    return (<>
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
        <div 
            style={{ width: `${width}px` }}
            className="px-4 h-full border-slate-700 border-l-2 flex flex-col"
        >   
            <div className="w-full h-16 flex items-center">
                <div className="w-full flex justify-between items-center">
                    <TooltipProvider 
                        text="Go back"
                        className="right-0 translate-y-1"
                    >
                        <SecondaryButton
                            onClick={() => {}}
                        >
                            <Icon type={Left} className="text-lg"/>
                        </SecondaryButton>
                    </TooltipProvider>
                    
                    <p className="font-bold text-slate-700 uppercase text-sm tracking-wide">Section 3/4</p>
                    <TooltipProvider 
                        text="Next"
                        className="right-0 translate-y-1"
                    >
                        <SecondaryButton
                            onClick={() => {}}
                        >
                            <Icon type={Right} className="text-lg"/>
                        </SecondaryButton>
                    </TooltipProvider>
                </div>
            </div>
            <div className="flex flex-col border-2 border-b-4 border-slate-700 rounded-md overflow-hidden">
                <div className="flex flex-col font-bold bg-violet-100 p-6 py-3 border-b-2 border-slate-700">
                    <div className="text-xs text-violet-500 flex items-center tracking-wide uppercase">
                        <Icon type={World} className="mr-2 text-base"/>
                        big idea
                    </div>
                    <p className="text-slate-700 mt-1">How much wood does a wood chuck chuck if a wood chuck could chuck wood?</p>
                </div>
                <textarea 
                    placeholder="Your answer here"
                    className="bg-white flex-grow w-full resize-none focus:outline-none px-6 py-3 text-slate-700 placeholder:text-slate-700/70"
                />
            </div>
            {/* <div className="h-full w-full flex flex-col items-center justify-center">
                <p className="mb-3 text-slate-700/70 text-center font-medium">You don't have any questions yet</p>
                <PrimaryButton onClick={() => {}}>
                    <Icon type={Magic} className="mr-3" />
                    Generate questions
                </PrimaryButton>
            </div> */}
        </div>
    </>)
}
import Icon from "@/theme/Icon";
import { TransferData } from "@icon-park/react";

export default function SearchShortcuts() {
    return (
        <div className="px-3 py-2 flex items-center border-t-2 border-slate-700 justify-around text-slate-700 font-medium text-xs bg-amber-200">
            <div className="flex items-center">
                <div className="bg-white mr-2 font-medium border-2 border-b-[3px] p-1 rounded-md border-slate-700">ENTER</div>
                Open document
            </div>
            <div className="flex items-center">
                <Icon type={TransferData} className="bg-white mr-2 text-sm border-2 border-r-[3px] p-1 rounded-md border-slate-700 rotate-90"/>
                Move up and down
            </div>
            <div className="flex items-center">
                <div className="bg-white mr-2 font-medium border-2 border-b-[3px] p-1 rounded-md border-slate-700">ESC</div>
                Close
            </div>
        </div>
    )
}
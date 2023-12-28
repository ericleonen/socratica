import Icon from "@/theme/Icon";
import { Down, Up } from "@icon-park/react";
import ShortcutKey from "./ShortcutKey";

export default function SearchShortcuts() {
    return (
        <div className="px-3 py-2 flex items-center border-t-2 border-slate-400 dark:border-slate-600 justify-around text-slate-400 dark:text-slate-500 font-medium text-xs">
            <div className="flex items-center">
                <ShortcutKey className="mr-2">ENTER</ShortcutKey>
                Open
            </div>
            <div className="flex items-center">
                <ShortcutKey className="mr-1">
                    <Icon type={Up} className="text-base" />
                </ShortcutKey>
                <ShortcutKey className="mr-2">
                    <Icon type={Down} className="text-base" />
                </ShortcutKey>
                Move up/down
            </div>
            <div className="flex items-center">
                <ShortcutKey className="mr-2">
                    ESC
                </ShortcutKey>
                Close
            </div>
        </div>
    )
}
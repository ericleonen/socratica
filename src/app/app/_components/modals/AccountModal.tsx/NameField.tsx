import { useAutoSave } from "@/db/docs/update";
import { useEditableUserName, useSaveUserName } from "@/db/user/update";
import { LayoutProps } from "@/types";
import { handleChange } from "@/utils/input";
import React, { useEffect } from "react";

type NameFieldProps = {
    nameDraft: string,
    setNameDraft: React.Dispatch<React.SetStateAction<string>>
}

export default function NameField({ nameDraft, setNameDraft }: NameFieldProps) {
    return (
        <input 
            type="text"
            value={nameDraft}
            onChange={handleChange(setNameDraft)}
            placeholder="Name"
            spellCheck={false}
            autoComplete="name"
            className={`
              text-slate-700 dark:text-slate-300 placeholder:text-slate-400 dark:placeholder:text-slate-500 border-slate-300 dark:border-slate-600 focus:border-amber-300 bg-white dark:bg-slate-800 rounded font-medium px-3 py-2
                border-2 w-full focus:outline-none focus:shadow-focus
            `}
        />
    )
}
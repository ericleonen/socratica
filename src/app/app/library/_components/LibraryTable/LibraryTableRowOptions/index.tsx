import { useState } from "react";
import LibraryTableRowOptionsButton from "./LibraryTableRowOptionsButton";
import Shadow from "@/components/Shadow";
import LibraryTableRowOptionsModal from "./LibraryTableRowOptionsModal";

type LibraryTableRowOptionsProps = {
    docID: string
}

export default function LibraryTableRowOptions({ docID }: LibraryTableRowOptionsProps) {
    const [show, setShow] = useState(false);

    return (<>
        <LibraryTableRowOptionsButton onClick={() => setShow(true)}/>
        {
            show &&
            <>
                <Shadow 
                    onClick={() => setShow(false)}
                    transparent
                />
                <LibraryTableRowOptionsModal 
                    onClick={() => setShow(false)} 
                    docID={docID}
                />
            </>
        }
    </>)
}
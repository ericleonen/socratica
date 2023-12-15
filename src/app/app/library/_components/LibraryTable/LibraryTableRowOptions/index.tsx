import LibraryTableRowOptionsButton from "./LibraryTableRowOptionsButton";
import Shadow from "@/components/Shadow";
import LibraryTableRowOptionsModal from "./LibraryTableRowOptionsModal";

type LibraryTableRowOptionsProps = {
    active: boolean,
    setActive: (active: boolean) => void,
    docID: string
}

export default function LibraryTableRowOptions({ active, setActive, docID }: LibraryTableRowOptionsProps) {
    return (<>
        <LibraryTableRowOptionsButton onClick={() => setActive(true)}/>
        { 
        active &&
            <>
                <Shadow
                    onClick={() => setActive(false)}
                    transparent
                /> 
                <LibraryTableRowOptionsModal 
                    onClick={() => setActive(false)} 
                    docID={docID}
                />
            </>
        }
    </>)
}
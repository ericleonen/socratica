import { useState } from "react";
import DocOptionsButton from "./DocOptionsButton";
import DocOptionsModal from "./DocOptionsModal";
import Shadow from "@/components/Shadow";
import { useDocsMetadatasLoadingStatus } from "@/db/docs/read";

export default function DocOptions() {
    const status = useDocsMetadatasLoadingStatus();

    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);

    return status === "succeeded" && (<>
        <DocOptionsButton onClick={() => setOpen(true)} />
        { 
            open && 
            <Shadow 
                onClick={close}
                transparent
            >
                <DocOptionsModal close={close} />
            </Shadow>
        }
    </>)
}
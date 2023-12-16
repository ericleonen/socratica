import { RootState } from "@/store";
import { ResourceStatus } from "@/store/types";
import { useState } from "react";
import { useSelector } from "react-redux";
import DocOptionsButton from "./DocOptionsButton";
import DocOptionsModal from "./DocOptionsModal";
import Shadow from "@/components/Shadow";

export default function DocOptions() {
    const status = useSelector<RootState, ResourceStatus>(
        state => state.docsMetadatas.status
    );
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
import { LoadingFour, PlusCross } from "@icon-park/react";
import { useCreateDoc } from "@/db/docs/create";
import SecondaryButton from "@/theme/SecondaryButton";
import Icon from "@/theme/Icon";

export default function SearchButton() {
    const [inProgress, createDoc] = useCreateDoc();

    return (
        <SecondaryButton
            size="xl"
            onClick={createDoc}
            className="mt-3"
        >
            <Icon 
                type={inProgress ? LoadingFour : PlusCross}
                className={`text-lg mr-3 ${inProgress && "animate-spin"}`}
            />
            { inProgress ? "Creating" : "New document" }
        </SecondaryButton>
    )
}
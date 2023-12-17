import { useCreateDoc } from "@/db/docs";
import Icon from "@/theme/Icon";
import PrimaryButton from "@/theme/PrimaryButton";
import PrimaryText from "@/theme/PrimaryText";
import { LoadingFour, PlusCross } from "@icon-park/react";

export default function NewDocButton() {
    const [inProgress, createDoc] = useCreateDoc();

    return (
        <PrimaryButton 
            onClick={createDoc}
        >{
            inProgress ? <>
                <Icon type={LoadingFour}  className="mr-3 animate-spin"/>
                Creating
            </>: <>
                <Icon type={PlusCross}  className="mr-3"/>
                New document
            </>
        }</PrimaryButton>
    )
}
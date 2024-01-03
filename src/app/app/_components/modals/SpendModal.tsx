import { useContext } from "react";
import Modal from "./Modal";
import { modalContexts } from "./ModalProviders";
import { useTokens } from "@/db/user/read";
import SecondaryButton from "@/theme/SecondaryButton";
import ActionButton from "@/theme/ActionButton";
import { useText } from "@/db/docs/read";
import { words2Tokens } from "@/utils/format";
import { useGenerateQuestions } from "@/db/docs/create";
import TooltipProvider from "@/components/TooltipProvider";

export default function SpendModal() {
    const { close } = useContext(modalContexts["spend"]);
    const tokens = useTokens();
    const text = useText().join("");

    const numTokens = words2Tokens(text);
    const generate = useGenerateQuestions();

    return (
        <Modal 
            {...{close}}
            className="p-7"
        >
            <p className="font-medium text-slate-700 dark:text-slate-300">Generating questions for this document costs <b>{numTokens}</b> tokens. {tokens >= 0 && <span>You currently have <b>{tokens}</b> tokens.</span>}</p>
            <div className="flex justify-end mt-5">
                <SecondaryButton 
                    onClick={close}
                    size="lg"
                    className="mr-3"
                >
                    Cancel
                </SecondaryButton>
                <TooltipProvider
                    text="You don't have enough tokens"
                    disabled={tokens >= numTokens}
                >
                    <ActionButton 
                        onClick={() => {
                            generate();
                            close();
                        }}
                        disabled={tokens < numTokens}
                    >
                        Generate
                    </ActionButton>
                </TooltipProvider>
            </div>
        </Modal>
    )
}
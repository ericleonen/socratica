import { useContext, useState } from "react";
import Modal from "../Modal";
import { modalContexts } from "../ModalProviders";
import AccountGroup from "./AccountGroup";
import NameField from "./NameField";
import EmailDisplay from "./EmailDisplay";
import { useTokens, useUserSavingStatus } from "@/db/user/read";
import DeleteButton from "@/theme/DeleteButton";
import BuyTokensButton from "./BuyTokensButton";
import LogOutButton from "./LogOutButton";
import { useEditableUserName, useSaveUserName } from "@/db/user/update";
import { Transition } from "@headlessui/react";
import SecondaryButton from "@/theme/SecondaryButton";
import Skeleton from "@/components/Skeleton";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";

export default function AccountModal() {
    const { close } = useContext(modalContexts["account"]);
    const [name, setName] = useEditableUserName();
    const [nameDraft, setNameDraft] = useState(name);
    const saveName = useSaveUserName();
    const tokens = useTokens();
    const userAuth = useAuthState(auth)[0];
    
    return (
        <Modal 
            {...{close}}
            className="text-slate-700 dark:text-slate-300 font-medium !w-[26rem]"
        >
            <p className="w-full p-3 font-bold text-center">Account</p>
           <AccountGroup name="Profile">
                <NameField {...{nameDraft, setNameDraft}} />
                <EmailDisplay className="mt-2" />
                <Transition
                    show={nameDraft !== name && !!userAuth}
                    enter="transition-[height,margin] invisible"
                    enterFrom="h-0"
                    enterTo="h-[32px]"
                    leave="transition-[height,margin] invisible"
                    leaveFrom="h-[32px]"
                    leaveTo="h-0"
                    className="overflow-hidden flex w-full mt-3"
                >
                <SecondaryButton
                    size="lg"
                    weight="light"
                    onClick={() => setNameDraft(name)}
                    className="ml-auto mr-2"
                >
                    Cancel
                </SecondaryButton>
                <button
                    onClick={() => {
                        setName(nameDraft);
                        saveName();
                    }}
                    className={`
                        px-2 py-1 text-blue-500 bg-blue-500/10 hover:bg-blue-500/30 focus-visible:bg-blue-500/30
                        rounded-md font-medium focus:outline-none
                    `}
                >
                    Save
                </button>
            </Transition>
           </AccountGroup>
           <AccountGroup name="Tokens">
                {
                    tokens >= 0 ? (
                        <p className="text-slate-700 dark:text-slate-300 font-medium">{
                            tokens === 0 ? "You don't have any tokens yet" :
                            `You have ${tokens.toLocaleString("en-US")} token${tokens > 1 ? "s" : ""}`
                        }</p>
                    ) : (
                        <Skeleton className="">The tokens you have</Skeleton>
                    )
                }
                <BuyTokensButton 
                    onClick={close}
                    className="mt-2"
                />
           </AccountGroup>
           <AccountGroup name="Advanced">
                <div className="w-full flex">
                    <LogOutButton />
                    <DeleteButton
                        onClick={() => {}}
                        className="ml-3"
                    >
                        Delete account
                    </DeleteButton>
                </div>
           </AccountGroup>
        </Modal>
    )
}
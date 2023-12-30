import { useContext } from "react";
import Modal from "../Modal";
import { modalContexts } from "../ModalProviders";
import AccountGroup from "./AccountGroup";
import NameField from "./NameField";
import EmailDisplay from "./EmailDisplay";
import PrimaryButton from "@/theme/PrimaryButton";
import Icon from "@/theme/Icon";
import { LoadingFour, Logout, PeopleDeleteOne } from "@icon-park/react";
import SecondaryButton from "@/theme/SecondaryButton";
import { useUserSavingStatus } from "@/db/user/read";
import TooltipProvider from "@/components/TooltipProvider";
import { useLogOut } from "@/auth";

export default function AccountModal() {
    const { close } = useContext(modalContexts["account"]);
    const savingStatus = useUserSavingStatus();

    const [loggingOut, logOut] = useLogOut();
    
    return (
        <Modal 
            {...{close}}
            className="text-slate-700 dark:text-slate-300 font-medium !w-[26rem]"
        >
           <div className="w-full p-3 text-center flex flex-between items-center">
                <div className="w-1/3">
                    <TooltipProvider
                        text="Log out"
                        containerClassName="w-min"
                        className="left-0 translate-y-1"
                    >
                        <SecondaryButton 
                            onClick={logOut}
                            weight="light"
                        >
                            <Icon type={Logout} className="rotate-180 text-lg"/>
                        </SecondaryButton>
                    </TooltipProvider>
                </div>
                <p className="font-bold text-slate-700 text-center flex-grow dark:text-slate-300">Account</p>
                <p className="w-1/3 text-sm text-slate-400 dark:text-slate-600 flex items-center whitespace-nowrap">{
                    loggingOut ? <>
                        <Icon type={LoadingFour} className="animate-spin mr-2 ml-auto"/>
                        Logging out
                    </> :
                    savingStatus === "saving" ? <>
                        <Icon type={LoadingFour} className="animate-spin mr-2 ml-auto"/>
                        Saving
                    </> :
                    savingStatus === "deleting" ? <>
                        <Icon type={LoadingFour} className="animate-spin mr-2 ml-auto"/>
                        Deleting
                    </> 
                    : null
                }</p>
            </div>
           <AccountGroup>
                <NameField />
                <EmailDisplay className="mt-3" />
           </AccountGroup>
           <AccountGroup>
                <PrimaryButton 
                    onClick={() => {}}
                    theme="danger"
                    size="sm"
                    className="w-min mr-auto"
                >
                    <Icon type={PeopleDeleteOne} className="text-lg mr-2"/>
                    Delete account
                </PrimaryButton>
           </AccountGroup>
        </Modal>
    )
}
import { useContext, useEffect, useState } from "react"
import { modalContexts } from "../ModalProviders"
import Modal from "../Modal";
import SecondaryButton from "@/theme/SecondaryButton";
import Icon from "@/theme/Icon";
import { Down } from "@icon-park/react";
import SettingsGroup from "./SettingsGroup";
import SettingContainer from "./SettingContainer";
import OptionsProvider, { Option } from "../../OptionsProvider";
import { useLocalStorage } from "@/utils/localStorage";

export default function SettingsModal() {
    const { close } = useContext(modalContexts["settings"]);

   const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light");

    const themeOptions: Option[] = [
        { text: "Light", onClick: () => setTheme("light") },
        { text: "Dark", onClick: () => setTheme("dark") }
    ];
    const marginsOptions: Option[] = [
        { text: "Small (0.5 in)", onClick: () => {} },
        { text: "Default (1 in)", onClick: () => {} },
        { text: "Large (2 in)", onClick: () => {} }
    ];
    const sectionOptions: Option[] = [
        { text: "Short (50 words)", onClick: () => {} },
        { text: "Default (100 words)", onClick: () => {} },
        { text: "Long (200 words)", onClick: () => {} }
    ];
    const compOptions: Option[] = [
        { text: "Few (every 200 words)", onClick: () => {} },
        { text: "Default (every 100 words)", onClick: () => {} },
        { text: "Many (every 50 words)", onClick: () => {} }
    ];
    const bigIdeaOptions: Option[] = [
        { text: "Rare (every 6)", onClick: () => {} },
        { text: "Default (every 4)", onClick: () => {} },
        { text: "Often (every 2)", onClick: () => {} }
    ]

    return (
        <Modal 
            {...{close}}
            className="text-slate-700 dark:text-slate-300 font-medium !w-[36rem]"
        >
            <p className="w-full p-3 font-bold text-center">Settings</p>
            <SettingsGroup name="Appearance">
                <SettingContainer
                    name="Theme"
                    description="Overall look of Highlights"
                >
                    <OptionsProvider 
                        options={themeOptions}
                        className="shadow-sm"
                    >
                        <SecondaryButton
                            onClick={() => {}}
                            weight="heavy"
                            size="lg"
                        >
                            { theme === "dark" ? "Dark" : "Light" }
                            <Icon type={Down} className="ml-1" />
                        </SecondaryButton>
                    </OptionsProvider>
                </SettingContainer>
                <SettingContainer
                    name="Document margins"
                    description="Spacing around document text"
                >
                    <OptionsProvider 
                        options={marginsOptions}
                        className="shadow-sm"
                    >
                        <SecondaryButton
                            onClick={() => {}}
                            weight="heavy"
                            size="lg"
                            className="ml-auto"
                        >
                            Default
                            <Icon type={Down} className="ml-1" />
                        </SecondaryButton>
                    </OptionsProvider>
                </SettingContainer>
            </SettingsGroup>
            <SettingsGroup name="Question generator">
                <SettingContainer
                    name="Section lengths"
                    description="Approximate size of a section"
                >
                    <OptionsProvider 
                        options={sectionOptions}
                        position="above"
                        className="shadow-sm"
                    >
                        <SecondaryButton
                            onClick={() => {}}
                            weight="heavy"
                            size="lg"
                            className="ml-auto"
                        >
                            Default
                            <Icon type={Down} className="ml-1" />
                        </SecondaryButton>
                    </OptionsProvider>
                </SettingContainer>
                <SettingContainer
                    name="Comprehension count"
                    description="# of comprehension questions per section"
                >
                    <OptionsProvider 
                        options={compOptions}
                        position="above"
                        className="shadow-sm"
                    >
                        <SecondaryButton
                            onClick={() => {}}
                            weight="heavy"
                            size="lg"
                            className="ml-auto"
                        >
                            Default
                            <Icon type={Down} className="ml-1" />
                        </SecondaryButton>
                    </OptionsProvider>
                </SettingContainer>
                <SettingContainer
                    name="Big idea frequency"
                    description="# of sections included in a big idea question"
                >
                    <OptionsProvider 
                        options={bigIdeaOptions}
                        position="above"
                        className="shadow-sm"
                    >
                        <SecondaryButton
                            onClick={() => {}}
                            weight="heavy"
                            size="lg"
                            className="ml-auto"
                        >
                            Default
                            <Icon type={Down} className="ml-1" />
                        </SecondaryButton>
                    </OptionsProvider>
                </SettingContainer>
            </SettingsGroup>
        </Modal>
    )
}
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
import { in2Px, words2Chars } from "@/utils/format";

export default function SettingsModal() {
    const { close } = useContext(modalContexts["settings"]);

    const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light");
    const themeOptions: Option[] = [
        { text: "Light", onClick: () => setTheme("light") },
        { text: "Dark", onClick: () => setTheme("dark") }
    ];
    
    const [margins, setMargins] = useLocalStorage<number>("margins", in2Px(1));
    const marginsOptions: Option[] = [
        { text: "Small (0.75 in)", onClick: () => setMargins(in2Px(0.75)) },
        { text: "Default (1 in)", onClick: () => setMargins(in2Px(1)) },
        { text: "Large (1.25 in)", onClick: () => setMargins(in2Px(1.25)) }
    ];

    const [sectionSize, setSectionSize] = useLocalStorage<number>("sectionSize", words2Chars(100))
    const sectionOptions: Option[] = [
        { text: "Short (50 words)", onClick: () => setSectionSize(words2Chars(50)) },
        { text: "Default (100 words)", onClick: () => setSectionSize(words2Chars(100)) },
        { text: "Long (200 words)", onClick: () => setSectionSize(words2Chars(200)) }
    ];

    const [compFreq, setCompFreq] = useLocalStorage<number>("compFreq", 100);
    const compOptions: Option[] = [
        { text: "Few (every 200 words)", onClick: () => setCompFreq(200) },
        { text: "Default (every 100 words)", onClick: () => setCompFreq(100) },
        { text: "Many (every 50 words)", onClick: () => setCompFreq(50) }
    ];

    const [bigIdeaFreq, setBigIdeaFreq] = useLocalStorage<number>("bigIdeaFreq", 4);
    const bigIdeaOptions: Option[] = [
        { text: "Rare (every 6)", onClick: () => setBigIdeaFreq(6) },
        { text: "Default (every 4)", onClick: () => setBigIdeaFreq(4) },
        { text: "Often (every 2)", onClick: () => setBigIdeaFreq(2) }
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
                            {
                                margins === in2Px(0.75) ? "Small" :
                                margins === in2Px(1) ? "Default" :
                                margins === in2Px(1.25) && "Large"
                            }
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
                            {
                                sectionSize === words2Chars(50) ? "Short" :
                                sectionSize === words2Chars(100) ? "Default" :
                                sectionSize === words2Chars(200) && "Long"
                            }
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
                            {
                                compFreq === 200 ? "Few" :
                                compFreq === 100 ? "Default" :
                                compFreq === 50 && "Many"
                            }
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
                            {
                                bigIdeaFreq === 6 ? "Rare" :
                                bigIdeaFreq === 4 ? "Default" :
                                bigIdeaFreq === 2 && "Often"
                            }
                            <Icon type={Down} className="ml-1" />
                        </SecondaryButton>
                    </OptionsProvider>
                </SettingContainer>
            </SettingsGroup>
        </Modal>
    )
}
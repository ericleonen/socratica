"use client"

import HorizontalLayout from "@/components/HorizontalLayout";
import { LayoutType } from "@/types";
import NavSideBar from "./_components/NavSideBar";
import ReduxProvider from "./_components/ReduxProvider";
import Content from "./_components/Content";

export default function AppLayout({ children }: LayoutType) {
    return (
        <HorizontalLayout screenWidth>
            <ReduxProvider>
                <Content>
                    <NavSideBar />
                    {children}
                </Content>
            </ReduxProvider>
        </HorizontalLayout>
    )
}
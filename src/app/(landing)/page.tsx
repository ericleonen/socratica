"use client"

import { useAutoLogIn } from "@/auth";
import Header from "./components/Header";
import Main from "./components/Main.tsx";

export default function Landing() {
  useAutoLogIn();

  return (
    <div className="w-full h-full flex flex-col bg-stone-100 dark:bg-slate-800">
      <Header />
      <div className="flex flex-col flex-grow">
        <Main />
      </div>
    </div>
  )
}
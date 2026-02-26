"use client";
import { ReactNode } from "react";
import Navbar from "@/components/organisms/Navbar/Navbar";
import Controls from "@/components/organisms/Controls";
import { usePathname } from "next/navigation";
import PlayingView from "@/components/organisms/PlayingView/PlayingView";

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      <Navbar />
      <main className="relative flex flex-col items-start grow overflow-auto overflow-x-hidden">
        {pathname === "/local" && <PlayingView />}
        {children}
      </main>
      {pathname === "/local" && <Controls />}
    </>
  );
}

"use client";
import L from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent, ReactNode } from "react";

interface ILinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function Link({ href, children, className = "" }: ILinkProps) {
  const router = useRouter();

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    if (typeof window === "undefined") return;

    e.preventDefault();
    e.currentTarget.blur();

    if (!window.document.startViewTransition) return router.push(href);

    window.document.startViewTransition(() => router.push(href));
  };
  return (
    <L
      href={href}
      onClick={handle}
      className={`text-[0.85rem] text-dark-200 hover:underline underline-offset-[18%] transition-colors duration-200 active:text-primary ${className}`}
    >
      {children}
    </L>
  );
}

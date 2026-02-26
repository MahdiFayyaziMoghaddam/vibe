"use client";

import Button from "@/components/atoms/Button/Button";
import Link from "@/components/atoms/Link/Link";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();
  const routes = ["stream", "global", "local"];
  return (
    <>
      <div className="relative py-2.5 bg-dark-800 border-b-1 border-b-dark-400 shrink-0 px-7 max-md:px-3 select-none">
        <h1 className="absolute flex items-center top-[calc(50%-17px)] max-md:top-[calc(50%-14px)] text-primary text-3xl max-md:text-2xl font-bold">
          Vibe
          <span className="text-[0.7rem] max-md:text-[0.55rem] max-sm:hidden text-dark-200/70 font-extralight! ml-2 max-md:ml-1.5">
            beta-1.0.4
          </span>
        </h1>
        <div className="flex justify-center items-center gap-4 max-md:gap-3 max-sm:gap-2 mx-auto">
          {routes.map((route) =>
            `/${route}` === pathname ? (
              <p
                className="text-sm px-2 py-1 rounded-sm max-md:text-xs! max-md:px-1 max-md:py-1 max-md:rounded-xs max-sm:text-[0.6rem]! bg-primary/60 border-1 border-primary first-letter:uppercase"
                key={route}
              >
                {route}
              </p>
            ) : (
              <Link
                className="text-sm! max-md:text-xs! max-md:px-1 max-md:py-1 max-md:rounded-xs max-md:underline max-sm:text-[0.6rem]! hover:no-underline! hover:bg-dark-500/75 px-2 py-1 rounded-sm active:text-dark-200! border-1 border-transparent hover:border-dark-500/75 first-letter:uppercase"
                href={`/${route}`}
                key={route}
              >
                {route}
              </Link>
            ),
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;

"use client";

import { cn } from "@/lib/utils";
import { menu } from "@/shared/const";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="sticky top-full bg-muted md:hidden">
      <div className="flex justify-around p-2 pb-3">
        {menu.authenticate.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link key={index} href={item.href}>
              <div
                className={cn("flex flex-col items-center gap-1 ", {
                  "text-primary": isActive,
                })}
              >
                <item.icon />
                <p className={cn("text-sm leading-none font-medium ")}>
                  {item.title}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

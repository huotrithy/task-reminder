"use client";

import { cn } from "@/lib/client-utils";
import { menu } from "@/shared/const";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-gray-200 md:hidden">
      <ul className="flex justify-around">
        {menu.authenticate.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <li key={index} className="flex-1">
              <Link href={item.href} className="block py-3">
                <div
                  className={cn(
                    "flex flex-col items-center gap-1 transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-gray-500 hover:text-gray-800"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 transition-transform",
                      isActive && "scale-110"
                    )}
                  />
                  <span className="text-xs font-medium">{item.title}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

"use client";

import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { menu } from "@/shared/const";
import { usePathname } from "next/navigation";

export function NavBar() {
  const session = useSession();
  const pathName = usePathname();
  // const [isOpenMenu, setOpenMenu] = useState(false);

  // function handleScroll(e: React.MouseEvent, id: string) {
  //   e.preventDefault();

  //   setTimeout(() => {
  //     const element = document.getElementById(id);
  //     if (element) {
  //       element.scrollIntoView({ behavior: "smooth" });
  //     }
  //   }, 100);
  // }

  function handleLogout() {
    signOut();
  }

  return (
    <header className="hidden md:flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f5] px-5 py-3">
      <div className="container max-w-7xl mx-auto">
        <nav className="flex items-center justify-between">
          <div className="flex gap-12 items-center">
            <Link
              href={session.status === "authenticated" ? "/app" : "/"}
              className="flex items-center gap-2"
            >
              <Image
                src="/task.svg"
                width={30}
                height={30}
                className="max-h-8"
                alt="Logo"
              />
              <span className="text-lg font-semibold tracking-tighter">
                Task Reminder
              </span>
            </Link>
            <NavigationMenu className="hidden md:block">
              <NavigationMenuList>
                {session.status === "authenticated" &&
                  menu.authenticate.map((item, index) => (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink
                        asChild
                        className="data-[active=true]:bg-primary/20"
                        data-active={pathName === item.href}
                      >
                        <Link href={item.href}>{item.title}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            {session.status === "authenticated" ? (
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button variant="outline">
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button>
                  <Link href="/sign-up">Start for free</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

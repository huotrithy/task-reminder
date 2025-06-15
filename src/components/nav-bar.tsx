"use client";

import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";

export function NavBar() {
  const session = useSession();
  const [isOpenMenu, setOpenMenu] = useState(false);

  function handleScroll(e: React.MouseEvent, id: string) {
    e.preventDefault();

    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }

  function handleLogout() {
    signOut();
  }

  const menu = {
    unauthenticate: [
      {
        title: "Features",
        body: (
          <NavigationMenuItem>
            <Link
              href="#feature"
              onClick={(e) => handleScroll(e, "feature")}
              className={navigationMenuTriggerStyle()}
            >
              Features
            </Link>
          </NavigationMenuItem>
        ),
        collapsedBody: null,
      },
      {
        title: "About",
        body: (
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/"
              className={navigationMenuTriggerStyle()}
            >
              About
            </NavigationMenuLink>
          </NavigationMenuItem>
        ),
        collapsedBody: (
          <div className="flex flex-col gap-6">
            <Link href="#" className="font-medium">
              About
            </Link>
          </div>
        ),
      },
    ],

    authenticate: [
      {
        title: "App",
        body: (
          <NavigationMenuItem>
            <Link href="/app" className={navigationMenuTriggerStyle()}>
              App
            </Link>
          </NavigationMenuItem>
        ),
        collapsedBody: (
          <div className="flex flex-col gap-6">
            <Link href="/app" className="font-medium">
              App
            </Link>
          </div>
        ),
      },
    ],
  };

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f5] px-10 py-3">
      <div className="container max-w-7xl mx-auto">
        <nav className="flex items-center justify-between">
          <div className="flex gap-12">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="task.svg"
                width={30}
                height={30}
                className="max-h-8"
                alt="Logo"
              />
              <span className="text-lg font-semibold tracking-tighter">
                Task Reminder
              </span>
            </Link>
            <NavigationMenu className="hidden lg:block">
              <NavigationMenuList>
                {session.status === "authenticated"
                  ? menu.authenticate.map((item, index) => (
                      <React.Fragment key={index}>
                        {item.collapsedBody}
                      </React.Fragment>
                    ))
                  : menu.unauthenticate.map((item, index) => (
                      <React.Fragment key={index}>
                        {item.collapsedBody}
                      </React.Fragment>
                    ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden items-center gap-4 lg:flex">
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

          <Sheet open={isOpenMenu} onOpenChange={setOpenMenu}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>

            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <Image
                      src="task.svg"
                      width={30}
                      height={10}
                      className="max-h-8"
                      alt="Shadcn UI Navbar"
                    />
                    <span className="text-lg font-semibold tracking-tighter">
                      Task Reminder
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col px-4 py-0 pb-3">
                <div className="flex flex-col gap-6">
                  {session.status === "authenticated"
                    ? menu.authenticate.map((item, index) => (
                        <React.Fragment key={index}>
                          {item.collapsedBody}
                        </React.Fragment>
                      ))
                    : menu.unauthenticate.map((item, index) => (
                        <React.Fragment key={index}>
                          {item.collapsedBody}
                        </React.Fragment>
                      ))}
                </div>
                {session.status === "authenticated" ? (
                  <div className="mt-6 flex flex-col gap-6">
                    <Button variant="outline" onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="mt-6 flex flex-col gap-4">
                    <Button variant="outline">Sign in</Button>
                    <Button>Start for free</Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}

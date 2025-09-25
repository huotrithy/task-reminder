"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";

export function MobileLandingPageNav() {
  const session = useSession();

  return (
    <header className=" flex md:hidden items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f5] px-5 py-3">
      <div className="container max-w-7xl mx-auto">
        <nav className="flex items-center justify-between">
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
          <div className="items-center gap-4 md:flex">
            {session.status === "authenticated" ? (
              <Button size="sm">
                <Link href="/app">Home</Link>
              </Button>
            ) : (
              <Button size="sm">
                <Link href="/login">Sign in</Link>
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

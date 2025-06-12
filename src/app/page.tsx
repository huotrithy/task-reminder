"use client";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  console.log(session);
  return (
    <div className="">
      Hello
      <h1>Hi</h1>
    </div>
  );
}

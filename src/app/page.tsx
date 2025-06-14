"use client";
import { FeatureCard } from "@/components/home/feature-card";
import { NavBar } from "@/components/nav-bar";
import { Bell, BookCheck, CalendarCheck } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  console.log(session);
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <NavBar />
        <div className="container max-w-6xl mx-auto flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col flex-1">
            <section id="banner" className="@[480px]:p-4">
              <div
                className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-lg items-start justify-end px-4 pb-10 @[480px]:px-10"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("banner.jpg")`,
                }}
              >
                <div className="flex flex-col gap-2 text-left">
                  <h1 className="text-white text-3xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                    Organize Your Work, Simplify Your Life
                  </h1>
                  <small className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                    Manage your task, with Scheduling
                  </small>
                </div>
              </div>
            </section>

            <section id="feature" className="flex flex-col gap-10 px-4 py-10 ">
              <div className="flex flex-col gap-4">
                <h2 className="text-[#111418] tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
                  Features
                </h2>
                <p className="text-[#111418] text-base font-normal leading-normal max-w-[720px]">
                  Task Reminder offers a range of features to help you stay
                  organized and productive.
                </p>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-0">
                <FeatureCard
                  icon={<BookCheck />}
                  title="Task Management"
                  desc="Create, and track tasks with ease. Set deadlines, prioritize tasks, and monitor progress."
                />
                <FeatureCard
                  icon={<CalendarCheck />}
                  title="Scheduling"
                  desc="Schedule tasks dealine. Set reminders and never miss a deadline"
                />
                <FeatureCard
                  icon={<Bell />}
                  title="Notification"
                  desc="Sent telegram notification upon near deadline"
                />
              </div>
            </section>
          </div>
        </div>
        <footer className="flex justify-center p-6 mt-8">
          <p className="text-[#60758a] text-base font-normal leading-normal">
            © 202t Task Reminder. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

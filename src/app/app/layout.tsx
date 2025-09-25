import { MobileNav } from "@/components/mobile-nav";
import { NavBar } from "@/components/nav-bar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="size-full min-h-screen bg-white group/design-root overflow-x-hidden">
      <div className="layout-container flex min-h-screen grow flex-col">
        <NavBar />
        {children}
        <MobileNav />
      </div>
    </div>
  );
}

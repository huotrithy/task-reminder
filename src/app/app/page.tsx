import { NavBar } from "@/components/nav-bar";

export default function app() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <NavBar />
        App page
      </div>
    </div>
  );
}

import { ChartPie, House, Settings } from "lucide-react";

export const menu = {
  unauthenticate: [],

  authenticate: [
    {
      title: "Home",
      href: "/app",
      icon: House,
    },
    {
      title: "Dashboard",
      href: "/app/dashboard",
      icon: ChartPie,
    },
    {
      title: "Setting",
      href: "/app/setting",
      icon: Settings,
    },
  ],
};

import { House, Settings } from "lucide-react";

export const menu = {
  unauthenticate: [],

  authenticate: [
    {
      title: "Home",
      href: "/app",
      icon: House,
    },
    {
      title: "Setting",
      href: "/app/setting",
      icon: Settings,
    },
  ],
};

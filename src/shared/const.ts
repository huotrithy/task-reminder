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

export const DEADLINE_PROXIMITY_OBJECT = {
  numOverdue: "Overdue",
  numDueThisWeek: "This Week",
  numDueTwoWeek: "Next 2 Weeks",
  numDueThisMonth: "This Month",
  moreDueThanAMonth: "More than a Month",
};

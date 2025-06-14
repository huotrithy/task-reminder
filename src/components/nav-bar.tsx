import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import Link from "next/link";

export function NavBar() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f5] px-10 py-3">
      <div className="container">
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
                <NavigationMenuItem>
                  <NavigationMenuLink>Features</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#"
                    className={navigationMenuTriggerStyle()}
                  >
                    About
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <Button variant="outline">Sign in</Button>
            <Button>Start for free</Button>
          </div>

          <Sheet>
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
              <div className="flex flex-col p-4">
                <div className="flex flex-col gap-6">
                  <Link href="#" className="font-medium">
                    Features
                  </Link>
                  <Link href="#" className="font-medium">
                    About
                  </Link>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <Button variant="outline">Sign in</Button>
                  <Button>Start for free</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}

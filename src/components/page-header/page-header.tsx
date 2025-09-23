import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  title?: string;
  desc?: string;
  backLink?: string;
  children?: ReactNode;
}

export default function PageHeader(props: Props) {
  return (
    <header className="md:hidden sticky top-0 z-40 flex items-center justify-between bg-sidebar-primary-foreground backdrop-blur-md px-4 py-3 border-b border-gray-400">
      <div
        className={cn("flex items-center min-w-0", { "gap-3": props.backLink })}
      >
        {props.backLink && (
          <Link
            href={props.backLink}
            className="flex items-center justify-center rounded-full p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ArrowLeft className="h-5 w-5 text-gray-500" />
            <span className="sr-only">Back</span>
          </Link>
        )}
        <div className="truncate">
          {props.title && (
            <h1 className="text-base font-semibold text-gray-900 truncate">
              {props.title}
            </h1>
          )}
          {props.desc && (
            <p className="text-xs text-gray-500 truncate">{props.desc}</p>
          )}
        </div>
      </div>

      {/* Right-side children (buttons, icons, etc.) */}
      <div className="flex items-center shrink-0">{props.children}</div>
    </header>
  );
}

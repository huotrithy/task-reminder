import { cn } from "@/lib/client-utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  title?: string;
  desc?: string;
  backLink?: string;
  children?: ReactNode;
}

export default function PageHeader({ title, desc, backLink, children }: Props) {
  return (
    <header className="md:hidden sticky top-0 z-50 flex items-center justify-between bg-white/95 backdrop-blur-md shadow-sm px-4 py-4 border-b border-gray-200">
      <div className={cn("flex items-center min-w-0", { "gap-3": backLink })}>
        {backLink && (
          <Link
            href={backLink}
            className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ArrowLeft className="h-5 w-5 text-primary" />
            <span className="sr-only">Back</span>
          </Link>
        )}
        <div className="truncate">
          {title && (
            <h1 className="text-base font-semibold text-gray-900 truncate">
              {title}
            </h1>
          )}
          {desc && <p className="text-xs text-gray-500 truncate">{desc}</p>}
        </div>
      </div>

      <div className="flex items-center shrink-0 gap-2">{children}</div>
    </header>
  );
}

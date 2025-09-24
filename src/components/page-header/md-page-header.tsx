import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { Separator } from "../ui/separator";

interface Props {
  title?: string;
  desc?: string;
  backLink?: string;
  children?: ReactNode;
}

export default function MdPageHeader({
  title,
  desc,
  backLink,
  children,
}: Props) {
  return (
    <div className="hidden md:block container max-w-7xl mx-auto px-6 mt-4">
      <header className="flex items-center justify-between mb-3 gap-4">
        <div className="flex items-center gap-4">
          {backLink && (
            <Link
              href={backLink}
              className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
              <span className="sr-only">Back</span>
            </Link>
          )}
          <div className="flex flex-col truncate">
            {title && (
              <h1 className="text-lg font-semibold text-gray-900 truncate">
                {title}
              </h1>
            )}
            {desc && (
              <p className="text-sm text-gray-500 truncate mt-0.5 line-clamp-2">
                {desc}
              </p>
            )}
          </div>
        </div>

        {/* Optional right-side children (buttons/icons) */}
        {children && <div className="flex items-center gap-2">{children}</div>}
      </header>

      <Separator className="border-gray-200" />
    </div>
  );
}

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Separator } from "./ui/separator";

interface Props {
  title?: string;
  subTitle?: string;
  backLink: string;
}

export function TitleHeader({ backLink, title, subTitle }: Props) {
  return (
    <>
      <div className="flex items-center mb-2 gap-3">
        <Link
          href={backLink}
          className="hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950"
        >
          <ArrowLeft className="h-6 w-6" />
          <span className="sr-only">Back</span>
        </Link>
        <div className="w-full flex justify-between items-center">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {title}
          </h2>

          {subTitle && (
            <p className="text-[#60758a] text-sm font-normal leading-normal line-clamp-2">
              {subTitle}
            </p>
          )}
        </div>
      </div>
      <Separator className="m-2" />
    </>
  );
}

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";

interface Props {
  title?: string;
  desc?: string;
  backLink?: string;
}

export function ActionPageHeader(props: Props) {
  return (
    <>
      <div className="hidden md:flex items-center mb-2 gap-4 px-4 mt-2">
        {props.backLink && (
          <Link
            href={props.backLink}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        )}

        <div className="w-full flex flex-col">
          <h4 className="text-xl font-semibold tracking-tight">
            {props.title}
          </h4>

          {props.desc && (
            <p className="text-[#60758a] text-sm font-normal leading-normal line-clamp-2">
              {props.desc}
            </p>
          )}
        </div>
      </div>
      <Separator />
    </>
  );
}

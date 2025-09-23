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
    <div className="md:hidden flex justify-between bg-muted px-4 py-2 border-b-gray border-b-2">
      <div className={cn("flex items-center ", { "gap-4": props.backLink })}>
        {props.backLink && (
          <Link
            href={props.backLink}
            className=" focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950"
          >
            <ArrowLeft className="h-6 w-6 text-gray-400" />
            <span className="sr-only">Back</span>
          </Link>
        )}
        <div>
          <h5 className="text-lg font-semibold tracking-tight">
            {props.title}
          </h5>
          {props.desc && (
            <small className="text-sm leading-none font-medium">
              {props.desc}
            </small>
          )}
        </div>
      </div>

      {props.children}
    </div>
  );
}

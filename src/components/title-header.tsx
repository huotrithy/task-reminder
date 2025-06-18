import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  title: string;
  backLink: string;
}

export function TitleHeader({ backLink, title }: Props) {
  return (
    <div className="flex items-center mb-4 gap-3">
      <Link
        href={backLink}
        className="hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950"
      >
        <ArrowLeft className="h-6 w-6" />
        <span className="sr-only">Back</span>
      </Link>
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {title}
      </h2>
    </div>
  );
}

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  backLink: string;
}

export function BackIcon({ backLink }: Props) {
  return (
    <div className="mb-4 flex justify-between">
      <Link
        href={backLink}
        style={{ padding: 0 }}
        className=" hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="sr-only">Back</span>
      </Link>
    </div>
  );
}

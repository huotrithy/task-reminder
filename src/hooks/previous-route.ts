"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function usePreviousRoute() {
  const pathname = usePathname();
  const ref = useRef<string | undefined>(undefined);

  useEffect(() => {
    ref.current = pathname;
  }, [pathname]);

  return ref.current;
}

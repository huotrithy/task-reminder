import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function MainContentWrapper(props: Props) {
  return (
    <main className="px-4 mt-4 mb-18 md:mb-0 container max-w-7xl mx-auto">
      {props.children}
    </main>
  );
}

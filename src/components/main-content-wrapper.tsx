import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function MainContentWrapper(props: Props) {
  return (
    <main className="px-4 mt-4 container max-w-7xl mx-auto">
      {props.children}
    </main>
  );
}

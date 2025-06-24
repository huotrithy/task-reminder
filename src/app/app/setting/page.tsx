import { TitleHeader } from "@/components/title-header";
import { getUser } from "@/lib/services/user-service";
import PageClient from "./page-client";

export default async function Page() {
  const response = await getUser();
  if (!response.success) {
    throw new Error(response.message || "An error has occured.");
  }

  return (
    <div>
      <TitleHeader title="Setting" backLink={`/app`} />
      <PageClient {...response.data.user} />
    </div>
  );
}

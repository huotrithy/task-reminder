import { BackIcon } from "@/components/back-icon";
import { getCategory } from "@/lib/services/category-service";
import { toast } from "sonner";

interface Props {
  params: { id: string };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const response = await getCategory(id);

  if (!response.success) {
    toast.error(response.message);
    throw new Error(response.message);
  }

  return (
    <div>
      <BackIcon backLink="/app" />
      <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
        {response.data.category.categoryName}
      </h2>
    </div>
  );
}

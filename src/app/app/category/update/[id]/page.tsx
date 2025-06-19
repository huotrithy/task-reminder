import { UpdateCategoryForm } from "@/components/category/update-form";
import { TitleHeader } from "@/components/title-header";
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
      <TitleHeader title="Update Category" backLink={`/app/category/${id}`} />
      <UpdateCategoryForm {...response.data.category} />
    </div>
  );
}

import { UpdateCategoryForm } from "@/components/category/update-form";
import { TitleHeader } from "@/components/title-header";
import { getCategory } from "@/lib/services/category-service";

interface Props {
  params: { id: string };
}

export default async function Page({ params }: Props) {
  const { id } = params;
  const category = await getCategory(id);
  console.log("category: ", category);
  return (
    <div>
      <TitleHeader title="Update Category" backLink={`/app/category/${id}`} />
      <UpdateCategoryForm />
    </div>
  );
}

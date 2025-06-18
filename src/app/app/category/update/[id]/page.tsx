import { CreateCategoryForm } from "@/components/category/create-form";
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
      <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
        Update Category
      </h2>
      <CreateCategoryForm />
    </div>
  );
}

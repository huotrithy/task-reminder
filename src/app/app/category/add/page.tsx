import { CreateCategoryForm } from "@/components/category/create-form";

export default function Page() {
  return (
    <div>
      <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
        Add new Category
      </h2>
      <CreateCategoryForm />
    </div>
  );
}

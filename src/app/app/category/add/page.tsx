import { TitleHeader } from "@/components/title-header";
import { CreateCategoryForm } from "@/components/category/create-form";

export default function Page() {
  return (
    <div>
      <TitleHeader title="Add new Category" backLink="/app" />
      <CreateCategoryForm />
    </div>
  );
}

export type TaskProps = {
  id: string;
  taskName: string;
  deadline?: Date | null;

  Category?: Category | null;
};

type Category = {
  categoryName: string;
};

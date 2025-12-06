/* Table imports */
import { type Column } from "@tanstack/react-table";

/* Shadcn imports */
import { Button } from "~/app/_components/ui/button";

/* Icons imports */
import { IconArrowDown, IconArrowUp, IconSelector } from "@tabler/icons-react";

/* Type definitios */
interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  hidden?: boolean;
}

export default function DataTableColumnHeader<TData, TValue>({
  column,
  title,
}: DataTableColumnHeaderProps<TData, TValue>) {
  return column.getCanSort() ? (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="px-2"
    >
      <span>{title}</span>
      {column.getIsSorted() === "desc" ? (
        <IconArrowUp />
      ) : column.getIsSorted() === "asc" ? (
        <IconArrowDown />
      ) : (
        <IconSelector />
      )}
    </Button>
  ) : (
    <span>{title}</span>
  );
}

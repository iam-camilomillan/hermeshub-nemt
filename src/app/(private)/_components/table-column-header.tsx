/* Shadcn imports */
import { Button } from "~/app/_components/ui/button";

/* Icons imports */
import { IconArrowDown, IconArrowUp, IconSelector } from "@tabler/icons-react";

/* Type imports */
import { type Column } from "@tanstack/react-table";

/* TableColumnHeader Props */
interface TableColumnHeaderProps<
  TData,
  TValue,
> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  hidden?: boolean;
}

const DataTableColumnHeader = <TData, TValue>({
  column,
  title,
}: TableColumnHeaderProps<TData, TValue>) => {
  return column.getCanSort() ? (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="cursor-pointer has-[>svg]:px-0"
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
};

export default DataTableColumnHeader;

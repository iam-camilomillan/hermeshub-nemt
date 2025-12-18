/* React Imports */
import { useMemo } from "react";

/* Shadcn Imports */
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/app/_components/ui/dropdown-menu";
import { Button } from "~/app/_components/ui/button";

/* Icons Imports */
import { IconAdjustments } from "@tabler/icons-react";

/* Type Imports */
import { type Table } from "@tanstack/react-table";

/* TableColumnFilter Props */
interface TableColumnFilterProps<TData> {
  table: Table<TData>;
}

const TableColumnFilter = <TData,>({
  table,
}: TableColumnFilterProps<TData>) => {
  const columns = useMemo(
    () =>
      table
        .getAllColumns()
        .filter(
          (column) =>
            typeof column.accessorFn !== "undefined" && column.getCanHide(),
        ),
    [table],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <IconAdjustments />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-42">
        {columns.map((column) => (
          <DropdownMenuCheckboxItem
            key={column.id}
            className="capitalize"
            checked={column.getIsVisible()}
            onCheckedChange={(value) => column.toggleVisibility(!!value)}
          >
            {column.columnDef.meta?.label ?? column.id}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableColumnFilter;

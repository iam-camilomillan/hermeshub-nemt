/* React imports */
import { useMemo } from "react";

/* Table imports */
import { type Table } from "@tanstack/react-table";

/* Shadcn imports */
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/app/_components/ui/dropdown-menu";
import { Button } from "~/app/_components/ui/button";

/* Icons imports */
import { IconAdjustments } from "@tabler/icons-react";

/* Type definitions */
interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export default function DataTableColumnHeader<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
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

      <DropdownMenuContent align="end" className="w-56">
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
}

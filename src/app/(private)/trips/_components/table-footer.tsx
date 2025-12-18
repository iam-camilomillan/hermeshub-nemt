/* Shadcn Imports */
import { Label } from "~/app/_components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/_components/ui/select";
import { Button } from "~/app/_components/ui/button";

/* Icons Imports */
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";

/* Type Imports */
import { type Table } from "@tanstack/react-table";

/* TableFooter Props */
interface TableFooterProps<TData> {
  table: Table<TData>;
}

const TableFooter = <TData,>({ table }: TableFooterProps<TData>) => {
  return (
    <div className="flex items-center justify-between px-2">
      {/* Left side */}
      <div className="text-muted-foreground text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} trips selected.
      </div>

      {/* Right side */}
      <div className="flex gap-4">
        {/* Rows per page */}
        <div className="flex gap-1">
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            Rows per page
          </Label>

          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-18" id="rows-per-page">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>

            <SelectContent side="top">
              {[50, 100, 150, 200, 9999999].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize > 200 ? "All" : pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Current page - Total pages */}
        <div className="flex items-center text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>

        {/* Pagination controls */}
        <div className="flex gap-x-1">
          <Button
            variant="outline"
            className="size-8"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <IconChevronsLeft />
          </Button>

          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <IconChevronLeft />
          </Button>

          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <IconChevronRight />
          </Button>

          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <IconChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TableFooter;

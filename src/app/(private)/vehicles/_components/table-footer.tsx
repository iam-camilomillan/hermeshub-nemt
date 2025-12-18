/* Shadcn Imports */
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
    <div className="flex items-center justify-end px-4">
      {/* Right side */}
      <div className="flex gap-4">
        {/* Current page - Total pages */}
        <div className="flex items-center text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>

        {/* Pagination controls */}
        <div className="flex gap-x-2">
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
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <IconChevronLeft />
          </Button>

          <Button
            variant="outline"
            className="size-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <IconChevronRight />
          </Button>

          <Button
            variant="outline"
            className="size-8"
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

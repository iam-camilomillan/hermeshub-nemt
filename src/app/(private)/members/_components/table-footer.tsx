"use client";

/* Types Imports */
import { type Table } from "@tanstack/react-table";

/* TableFooter Props */
interface TableFooterProps<TData> {
  table: Table<TData>;
}

const TableFooter = <TData,>({ table }: TableFooterProps<TData>) => {
  return (
    <div className="text-muted-foreground flex items-center justify-between px-2 text-sm">
      <div className="text-muted-foreground flex-1 text-sm">
        {table.getFilteredRowModel().rows.length} row(s) total.
      </div>
    </div>
  );
};

export default TableFooter;

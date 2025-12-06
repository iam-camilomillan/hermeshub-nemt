"use client";

/* React Imports */
import { useState } from "react";

/* Table Imports */
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  RowSelectionState,
  PaginationState,
} from "@tanstack/react-table";

/* Shadcn Imports */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/app/_components/ui/table";
import { Spinner } from "~/app/_components/ui/spinner";

/* Interface Definitions */
interface DataTableProps<TData, TValue> {
  data: TData[];
  isLoading: boolean;
  TableToolbar: React.ElementType;
  TableFooter: React.ElementType;
  tableColumns: ColumnDef<TData, TValue>[];
}

export default function DataTable<TData, TValue>({
  data,
  isLoading,
  TableToolbar,
  TableFooter,
  tableColumns,
}: DataTableProps<TData, TValue>) {
  /* Local States */
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });

  /* Table definition */
  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      rowSelection,
      pagination,
    },

    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <section className="flex h-full flex-col gap-2">
      {/* Table toolbar */}
      <TableToolbar table={table} />

      {/* Table content */}
      <div className="flex-1 overflow-auto rounded-xl border **:data-[slot=table-container]:h-full">
        <Table
          className={
            isLoading || !table.getRowModel().rows?.length ? "h-full" : ""
          }
        >
          {/* Table Header */}
          <TableHeader className="bg-muted sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          {/* Table Body */}
          <TableBody
            className={
              isLoading || !table.getRowModel().rows?.length ? "h-full" : ""
            }
          >
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={tableColumns.length}>
                  <div className="flex h-full items-center justify-center">
                    <Spinner className="size-6" />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={tableColumns.length}>
                  <div className="flex h-full items-center justify-center">
                    <span className="text-muted-foreground">No data.</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Table pagination */}
      <TableFooter table={table} />
    </section>
  );
}

"use client";

/* React imports */
import { useState } from "react";

/* Table imports */
import { type Table } from "@tanstack/react-table";

/* Shadcn imports */
import { Input } from "~/app/_components/ui/input";
import { Button } from "~/app/_components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/app/_components/ui/select";

/* Icons imports */
import { IconPlus, IconX } from "@tabler/icons-react";

/* Components imports */
import DataTableRowFilter from "~/app/(private)/_components/data_table_row_filter";

/* Types imports */

import DataTableDateFilter from "./data_table_date_filter";

/* Types definitios */
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterSettings: any;
}

export default function DataTableToolbar<TData>({
  table,
  filterSettings,
}: DataTableToolbarProps<TData>) {
  const [searchBy, setSearchBy] = useState(
    filterSettings.searchBy.defaultValue,
  );
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center gap-x-2">
      {/* Search */}
      <div className="flex">
        <Select
          defaultValue={searchBy}
          onValueChange={(value) => setSearchBy(value)}
        >
          {/* Search by */}
          <SelectTrigger className="w-[124px] rounded-r-none">
            <SelectValue placeholder="Search by" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Search by</SelectLabel>
              {filterSettings.searchBy.selectItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Input */}
        <Input
          placeholder={filterSettings.searchBy.placeholder}
          value={(table.getColumn(searchBy)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchBy)?.setFilterValue(event.target.value)
          }
          className="rounded-l-none"
        />
      </div>

      {filterSettings.dateFilter ? <DataTableDateFilter table={table} /> : null}

      <div className="flex gap-x-1">
        {filterSettings.rowFilter.map(
          (items) =>
            table.getColumn(items.column) && (
              <DataTableRowFilter
                key={items.column}
                column={table.getColumn(items.column)}
                title={items.title}
                options={items.options}
              />
            ),
        )}
      </div>

      {/* Reset filter if there is selection */}
      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 lg:px-3"
        >
          Reset
          <IconX />
        </Button>
      )}

      {/* Add item button */}
      <Button size={"sm"} className="ml-auto">
        <IconPlus />
        <span className="font-bold">Add trip</span>
      </Button>
    </div>
  );
}

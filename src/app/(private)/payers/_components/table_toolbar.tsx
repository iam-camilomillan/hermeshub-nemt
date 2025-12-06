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

/* Store imports */
import { useDrawerStore } from "~/store/useTableStore";

/* Types Imports */
import { tableFilterSettings } from "~/app/(private)/payers/utils/table_filter_settings";

/* Types definitios */
interface TableToolbarProps<TData> {
  table: Table<TData>;
}

export default function TableToolbar<TData>({
  table,
}: TableToolbarProps<TData>) {
  /* Local states */
  const [searchBy, setSearchBy] = useState(
    tableFilterSettings.searchBy.defaultValue,
  );
  const isFiltered = table?.getState().columnFilters.length > 0;

  /* Add Payer Action */
  const handleAddPayer = () => {
    useDrawerStore.setState({ isDrawerOpen: true });
  };

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
              {tableFilterSettings?.searchBy?.selectItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Input */}
        <Input
          placeholder={tableFilterSettings?.searchBy?.placeholder}
          value={(table?.getColumn(searchBy)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table?.getColumn(searchBy)?.setFilterValue(event.target.value)
          }
          className="rounded-l-none"
        />
      </div>

      {/* Reset filter if there is selection */}
      {isFiltered && (
        <Button variant="ghost" onClick={() => table?.resetColumnFilters()}>
          Reset
          <IconX />
        </Button>
      )}

      {/* Add item button */}
      <Button size={"sm"} className="ml-auto" onClick={handleAddPayer}>
        <IconPlus />
        <span>Add Payer</span>
      </Button>
    </div>
  );
}

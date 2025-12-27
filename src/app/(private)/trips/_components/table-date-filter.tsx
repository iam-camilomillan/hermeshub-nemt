/* React Imports */
import React from "react";

/* Shadcn Imports */
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/app/_components/ui/popover";
import { Button } from "~/app/_components/ui/button";
import { Calendar } from "~/app/_components/ui/calendar";
import { Separator } from "~/app/_components/ui/separator";
import { Badge } from "~/app/_components/ui/badge";

/* Icons Imports */
import { IconCalendar } from "@tabler/icons-react";

/* Store Imports */
import { useTripsStore } from "~/store/use-trips-store";

/* Type Imports */
import { type Table } from "@tanstack/react-table";
import { type DateRange } from "react-day-picker";

/* TableDateFilter Props */
interface TableDateFilterProps<TData> {
  table: Table<TData>;
}

const TableDateFilter = <TData,>({ table }: TableDateFilterProps<TData>) => {
  /* Global states */
  const { filtersData, setFiltersData } = useTripsStore();

  /* Handlers */
  const onSelect = (range: DateRange | undefined) => {
    if (range?.from) {
      setFiltersData({
        ...filtersData,
        date: {
          from: range.from,
          to: range.to ?? range.from,
        },
      });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          {/* Label */}
          <IconCalendar />
          <span>Date</span>

          {/* Selected values */}
          {filtersData.date && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />

              <div className="flex items-center gap-x-1">
                <span>from:</span>

                <Badge
                  variant={"secondary"}
                  className="rounded-sm px-1 font-normal"
                >
                  {filtersData.date.from.toLocaleDateString("en-US")}
                </Badge>
              </div>

              <div className="flex items-center gap-x-1">
                <span>to:</span>

                <Badge
                  variant={"secondary"}
                  className="rounded-sm px-1 font-normal"
                >
                  {filtersData.date.to.toLocaleDateString("en-US")}
                </Badge>
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-fit p-0" align="start">
        <Calendar
          mode="range"
          selected={filtersData.date}
          onSelect={onSelect}
          defaultMonth={filtersData.date.from}
          numberOfMonths={2}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
};

export default TableDateFilter;

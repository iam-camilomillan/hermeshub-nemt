/* React Imports */
import { useEffect, useState } from "react";

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

/* Type Imports */
import { type Table } from "@tanstack/react-table";
import { type DateRange } from "react-day-picker";

/* TableDateFilter Props */
interface TableDateFilterProps<TData> {
  table: Table<TData>;
}

const TableDateFilter = <TData,>({ table }: TableDateFilterProps<TData>) => {
  /* Local states */
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  useEffect(() => {
    table
      .getColumn("date")
      ?.setFilterValue(
        date?.from || date?.to ? [date.from, date.to] : undefined,
      );
  }, [table, date]);

  console.log(date);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          {/* Label */}
          <IconCalendar />
          <span>Date</span>

          {/* Selected values */}
          {date && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />

              <div className="flex items-center gap-x-1">
                <span>from:</span>

                <Badge
                  variant={"secondary"}
                  className="rounded-sm px-1 font-normal"
                >
                  {date?.from?.toLocaleDateString("en-US") ?? "None"}
                </Badge>
              </div>

              <div className="flex items-center gap-x-1">
                <span>to:</span>

                <Badge
                  variant={"secondary"}
                  className="rounded-sm px-1 font-normal"
                >
                  {date?.to?.toLocaleDateString("en-US") ?? "None"}
                </Badge>
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-fit p-0" align="start">
        <Calendar
          mode="range"
          selected={date}
          onSelect={setDate}
          defaultMonth={date?.from ?? new Date()}
          numberOfMonths={2}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
};

export default TableDateFilter;

/* React imports */
import { useEffect, useState } from "react";

/* Table imports */
import { type Table } from "@tanstack/react-table";

/* Shadcn imports */
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/app/_components/ui/popover";
import { Button } from "~/app/_components/ui/button";
import { Calendar } from "~/app/_components/ui/calendar";

/* Icons imports */
import { IconCalendar } from "@tabler/icons-react";

/* Types definitions */
import type { DateRange } from "react-day-picker";
import { Separator } from "~/app/_components/ui/separator";
import { Badge } from "~/app/_components/ui/badge";
interface DataTableDateFilterProps<TData> {
  table: Table<TData>;
}

export default function DataTableRowFilter<TData>({
  table,
}: DataTableDateFilterProps<TData>) {
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

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          {/* Option */}
          <IconCalendar />
          <span>Date</span>

          {/* Selected values */}
          {date && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />

              <div className="flex gap-x-1">
                from:
                <Badge
                  variant={"secondary"}
                  className="rounded-sm bg-neutral-700 px-1 font-normal"
                >
                  {date?.from?.toLocaleDateString("en-US") ?? "None"}
                </Badge>
              </div>

              <div className="flex gap-x-1">
                to:
                <Badge
                  variant={"secondary"}
                  className="rounded-sm bg-neutral-700 px-1 font-normal"
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
          className=""
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
}

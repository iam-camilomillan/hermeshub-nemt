"use client";

/* Shadcn Imports */
import { Checkbox } from "~/app/_components/ui/checkbox";
import { Badge } from "~/app/_components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/app/_components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/app/_components/ui/dropdown-menu";
import { Button } from "~/app/_components/ui/button";

/* Icons Imports */
import {
  IconBedFlat,
  IconBrandGoogleMaps,
  IconCheck,
  IconCircle,
  IconCircleCheckFilled,
  IconCircleChevronRight,
  IconCircleDotted,
  IconCircleFilled,
  IconCircleLetterA,
  IconCircleLetterI,
  IconCircleLetterL,
  IconCircleLetterU,
  IconDisabled,
  IconDotsVertical,
  IconInfoCircle,
  IconOld,
  IconPhone,
  IconPhoneCall,
  IconWalk,
  IconX,
} from "@tabler/icons-react";

/* Component Imports */
import DataTableColumnHeader from "~/app/(private)/_components/table-column-header";
import TableColumnFilter from "~/app/(private)/trips/_components/table-column-filter";
import CopyableItem from "~/app/(private)/_components/copyable-item";

/* Type Imports */
import { type ColumnDef } from "@tanstack/react-table";

/* Type Definitions */
type DateRange = [Date | null, Date | null] | undefined;

const formatTime = (time: string | null | undefined) => {
  if (!time) return "";
  // Check if it matches HH:MM:SS format and slice
  if (time.includes(":")) {
    return time.slice(0, 5);
  }
  return time;
};

export const tableColumns: ColumnDef<any>[] = [
  /* Select checkbox */
  {
    id: "select",
    accessorKey: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),

    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),

    enableSorting: false,
    enableHiding: false,
  },

  /* Trip ID */
  {
    id: "public_id",
    accessorKey: "public_id",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trip ID" />
    ),

    cell: ({ row }) => (
      <div>
        <Tooltip>
          <TooltipTrigger>
            {row.original.status.toString() === "Completed" && (
              <Badge className="bg-zinc-400">
                <span className="font-bold">&#35;{row.original.public_id}</span>
                <IconCheck />
              </Badge>
            )}

            {row.original.status.toString() === "Loaded" && (
              <Badge className="bg-green-500 font-bold">
                <span className="font-bold">&#35;{row.original.public_id}</span>
                <IconCircleLetterL />
              </Badge>
            )}

            {row.original.status.toString() === "In route" && (
              <Badge className="bg-green-400 font-bold">
                <span className="font-bold">&#35;{row.original.public_id}</span>
                <IconCircleLetterI />
              </Badge>
            )}

            {row.original.status.toString() === "Assigned" && (
              <Badge className="bg-blue-400 font-bold">
                <span className="font-bold">&#35;{row.original.public_id}</span>
                <IconCircleLetterA />
              </Badge>
            )}

            {row.original.status.toString() === "Unassigned" && (
              <Badge className="bg-amber-400 font-bold">
                <span className="font-bold">&#35;{row.original.public_id}</span>
                <IconCircleLetterU />
              </Badge>
            )}

            {row.original.status.toString() === "Will Call" && (
              <Badge className="bg-purple-400">
                <span className="font-bold">&#35;{row.original.public_id}</span>
                <IconPhoneCall />
              </Badge>
            )}

            {row.original.status.toString() === "Canceled" && (
              <Badge className="bg-red-400 font-bold">
                <span className="font-bold">&#35;{row.original.public_id}</span>
                <IconX />
              </Badge>
            )}
          </TooltipTrigger>

          <TooltipContent>
            <span>{row.original.status}</span>
          </TooltipContent>
        </Tooltip>
      </div>
    ),

    filterFn: (row, columnId, filterValue: string[]) => {
      if (!filterValue?.length) return true;
      return filterValue.includes(row.getValue(columnId));
    },
  },

  /* Trip Status */
  {
    id: "status",
    accessorKey: "status",
    header: () => <span>Status</span>,

    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
  },

  /* Trip Date */
  {
    id: "date",
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),

    cell: ({ row }) => <div>{row.original.date}</div>,

    filterFn: (row, id, value: DateRange) => {
      const cellValue = row.getValue(id);

      if (!cellValue) return false;

      // Helper to parse cell value to Date at midnight
      const parseCellDate = (val: string | Date): Date | null => {
        if (val instanceof Date) {
          val.setHours(0, 0, 0, 0);
          return val;
        }

        let date: Date;

        // Try parsing YYYY-MM-DD (ISO)
        if (val.includes("-")) {
          // Treat YYYY-MM-DD as local date parts to avoid UTC shift
          const [y, m, d] = val.split("-").map(Number);
          date = new Date(y!, m! - 1, d!);
        }
        // Try parsing MM/DD/YYYY
        else if (val.includes("/")) {
          const [m, d, y] = val.split("/").map(Number);
          date = new Date(y!, m! - 1, d!);
        } else {
          // Fallback
          date = new Date(val);
        }

        if (isNaN(date.getTime())) return null;
        date.setHours(0, 0, 0, 0);
        return date;
      };

      const cellDate = parseCellDate(cellValue as string | Date);
      if (!cellDate) return false;

      const [start, end] = value ?? [null, null];

      // Normalize range dates to midnight
      if (start) start.setHours(0, 0, 0, 0);
      if (end) end.setHours(0, 0, 0, 0);

      if (start && end) return cellDate >= start && cellDate <= end;
      if (start) return cellDate >= start;
      if (end) return cellDate <= end;

      return true;
    },
  },

  /* PU Time */
  {
    id: "scheduled_pickup_time",
    accessorKey: "scheduled_pickup_time",
    meta: {
      label: "PU Time",
    },

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PU Time" />
    ),

    cell: ({ row }) => {
      const pickupStatus = row.original.actual_pickup_time
        ? row.original.actual_pickup_time > row.original.scheduled_pickup_time
          ? "Late"
          : "On Time"
        : "Pending";

      return (
        <div className="flex gap-x-1">
          <span>{formatTime(row.original.scheduled_pickup_time)}</span>

          {pickupStatus === "Late" ? (
            <span className="text-red-400 opacity-80">
              &#40;{formatTime(row.original.actual_pickup_time)}&#41;
            </span>
          ) : null}

          {pickupStatus === "On Time" ? (
            <span className="text-green-400 opacity-80">
              &#40;{formatTime(row.original.actual_pickup_time)}&#41;
            </span>
          ) : null}
        </div>
      );
    },
  },

  /* DO Time */
  {
    id: "scheduled_dropoff_time",
    accessorKey: "scheduled_dropoff_time",
    meta: {
      label: "DO Time",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DO Time" />
    ),

    cell: ({ row }) => {
      const pickupStatus = row.original.actual_dropoff_time
        ? row.original.actual_dropoff_time > row.original.scheduled_dropoff_time
          ? "Late"
          : "On Time"
        : "Pending";

      return (
        <div className="flex gap-x-1">
          <span>{formatTime(row.original.scheduled_dropoff_time)}</span>

          {pickupStatus === "Late" ? (
            <span className="text-red-400 opacity-80">
              &#40;{formatTime(row.original.actual_dropoff_time)}&#41;
            </span>
          ) : null}

          {pickupStatus === "On Time" ? (
            <span className="text-green-400 opacity-80">
              &#40;{formatTime(row.original.actual_dropoff_time)}&#41;
            </span>
          ) : null}
        </div>
      );
    },
  },

  /* Member´s Name */
  {
    id: "passenger_name",
    meta: {
      label: "Name",
    },

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Passenger" />
    ),

    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-2">
          <span className="truncate font-medium">
            {row.original.passenger_first_name}{" "}
            {row.original.passenger_last_name}
          </span>
          <div className="flex items-center">
            <CopyableItem
              label={row.original.passenger_phone_number?.toString() ?? ""}
              value={row.original.passenger_phone_number?.toString() ?? ""}
            >
              <IconPhone className="text-muted-foreground size-4" />
            </CopyableItem>

            <Tooltip>
              <TooltipTrigger>
                {row.original.level_of_service.toString() === "Wheelchair" && (
                  <IconDisabled className="text-muted-foreground size-4" />
                )}

                {row.original.level_of_service.toString() ===
                  "Bariatric Wheelchair" && (
                  <IconDisabled className="text-muted-foreground size-4" />
                )}

                {row.original.level_of_service.toString() === "Stretcher" && (
                  <IconBedFlat className="text-muted-foreground size-4" />
                )}

                {row.original.level_of_service.toString() === "Ambulatory" && (
                  <IconWalk className="text-muted-foreground size-4" />
                )}

                {row.original.level_of_service.toString() ===
                  "Curb To Curb" && (
                  <IconWalk className="text-muted-foreground size-4" />
                )}

                {row.original.level_of_service.toString() ===
                  "Door To Door" && (
                  <IconOld className="text-muted-foreground size-4" />
                )}
              </TooltipTrigger>

              <TooltipContent>
                <span>{row.original.level_of_service}</span>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      );
    },

    accessorFn: (row) =>
      `${row.passenger_first_name} ${row.passenger_last_name}`,
  },

  /* Member Phone Number */
  {
    id: "passenger_phone_number",
    accessorKey: "passenger_phone_number",
    meta: {
      label: "Phone",
    },

    header: "Phone",

    cell: ({ row }) => (
      <CopyableItem
        label={row.original.passenger_phone_number?.toString() ?? ""}
        value={row.original.passenger_phone_number?.toString() ?? ""}
      >
        <span>{row.original.passenger_phone_number}</span>
      </CopyableItem>
    ),
  },

  /* Member´s Pickup Address */
  {
    id: "pickup_address",
    accessorKey: "pickup_address",
    meta: {
      label: "PU Address",
    },

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PU Address" />
    ),

    cell: ({ row }) => {
      const addressLink = `https://www.google.com/maps?q=${encodeURIComponent(row.original.pickup_address)}`;

      return (
        <div className="flex items-center">
          {/* Address */}
          <CopyableItem value={row.original.pickup_address}>
            {row.original.pickup_address}
          </CopyableItem>

          <div className="flex items-center gap-x-2">
            {/* Facility */}
            {row.original.pickup_location_name ? (
              <Tooltip>
                <TooltipTrigger>
                  <IconInfoCircle />
                </TooltipTrigger>

                <TooltipContent>
                  <span className="capitalize">
                    {row.original.pickup_location_name}
                  </span>
                </TooltipContent>
              </Tooltip>
            ) : null}

            <CopyableItem
              label={row.original.pickup_phone_number?.toString() ?? ""}
              value={row.original.pickup_phone_number?.toString() ?? ""}
            >
              <IconPhone />
            </CopyableItem>

            {/* Google maps link */}
            <CopyableItem value={addressLink}>
              <IconBrandGoogleMaps />
            </CopyableItem>
          </div>
        </div>
      );
    },
  },

  /* Member´s Dropoff Adress */
  {
    id: "dropoff_address",
    accessorKey: "dropoff_address",
    meta: {
      label: "DO Address",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DO Address" />
    ),

    cell: ({ row }) => {
      const addressLink = `https://www.google.com/maps?q=${encodeURIComponent(row.original.dropoff_address)}`;

      return (
        <div className="flex items-center">
          {/* Address */}
          <CopyableItem value={row.original.dropoff_address}>
            {row.original.dropoff_address}
          </CopyableItem>

          <div className="flex items-center gap-x-2">
            {/* Facility */}
            {row.original.dropoff_location_name ? (
              <Tooltip>
                <TooltipTrigger>
                  <IconInfoCircle />
                </TooltipTrigger>

                <TooltipContent>
                  <span className="capitalize">
                    {row.original.dropoff_location_name}
                  </span>
                </TooltipContent>
              </Tooltip>
            ) : null}

            <CopyableItem
              label={row.original.dropoff_phone_number?.toString() ?? ""}
              value={row.original.dropoff_phone_number?.toString() ?? ""}
            >
              <IconPhone />
            </CopyableItem>

            {/* Google maps link */}
            <CopyableItem value={addressLink} label="Copy Google Maps Link">
              <IconBrandGoogleMaps />
            </CopyableItem>
          </div>
        </div>
      );
    },
  },

  /* Miles */
  {
    id: "mileage",
    accessorKey: "mileage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Miles" />
    ),

    cell: ({ row }) => {
      const miles = parseFloat(row.original.mileage?.toString() ?? "0");
      return <span>{miles.toFixed(2)} mi</span>;
    },
  },

  /* LOS */
  {
    id: "level_of_service",
    accessorKey: "level_of_service",
    meta: {
      label: "LOS",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="LOS" />
    ),

    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.original.level_of_service}</span>
        </div>
      );
    },

    filterFn: (row, id, value: string[]) => {
      const cellValue = String(row.getValue(id));
      return value.includes(String(cellValue));
    },
  },

  /* Price */
  {
    id: "price",
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => `$${row.original.price}`,
  },

  /* Payer */
  {
    id: "payer_id",
    accessorKey: "payer_id",
    header: "Payer",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.payer_id === "ALIVI" && (
            <Badge className="bg-yellow-300">{row.original.payer_id}</Badge>
          )}

          {row.original.payer_id === "MODIVCARE" && (
            <Badge className="bg-blue-300">{row.original.payer_id}</Badge>
          )}

          {row.original.payer_id === "SAFERIDE" && (
            <Badge className="bg-green-300">{row.original.payer_id}</Badge>
          )}

          {row.original.payer_id === "ACCESS TO CARE" && (
            <Badge className="bg-orange-300">{row.original.payer_id}</Badge>
          )}
        </div>
      );
    },

    filterFn: (row, id, value: string[]) => {
      const cellValue = String(row.getValue(id));

      return value.includes(String(cellValue));
    },
  },

  /* Row actions */
  {
    id: "actions",
    header: ({ table }) => {
      return <TableColumnFilter table={table} />;
    },

    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Complete</DropdownMenuItem>
          <DropdownMenuItem>Hold</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuItem>Add Leg</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Cancel</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),

    enablePinning: true,
  },
];

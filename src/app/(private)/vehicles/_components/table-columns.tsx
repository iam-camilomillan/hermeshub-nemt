"use client";

/* Shadcn Imports */
import { Button } from "~/app/_components/ui/button";
import { Badge } from "~/app/_components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/app/_components/ui/tooltip";

/* Icons Imports */
import { IconDisabled, IconBedFlat, IconWalk } from "@tabler/icons-react";

/* Component Imports */
import TableColumnHeader from "~/app/(private)/_components/table-column-header";

/* Store Imports */
import { useDrawerStore } from "~/store/use-drawer-store";

/* Type Imports */
import { type ColumnDef } from "@tanstack/react-table";

export const tableColumns: ColumnDef<any>[] = [
  /* LOS */
  {
    id: "status",
    accessorKey: "status",
    header: () => <span className="w-24">Status</span>,

    cell: ({ row }) => (
      <Badge
        style={{
          backgroundColor:
            row.original.status === "active"
              ? "oklch(79.2% 0.209 151.711)"
              : "oklch(70.4% 0.191 22.216)",
        }}
      >
        <span className="font-bold capitalize">{row.original.status}</span>
      </Badge>
    ),
  },

  /* Name */
  {
    id: "public_id",
    accessorKey: "public_id",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Vehicle Id" />
    ),

    cell: ({ row }) => {
      /* Click Action */
      const handleClick = () => {
        useDrawerStore.setState({
          isDrawerOpen: true,
          drawerData: row.original,
        });
      };

      return (
        <div className="flex items-center gap-1">
          <Button variant="link" className="pr-0" onClick={handleClick}>
            {row.original.public_id}
          </Button>

          <Tooltip>
            <TooltipTrigger>
              {row.original.level_of_service === "wheelchair" && (
                <IconDisabled className="text-muted-foreground size-6" />
              )}
              {row.original.level_of_service === "stretcher" && (
                <IconBedFlat className="text-muted-foreground size-6" />
              )}

              {row.original.level_of_service === "ambulatory" && (
                <IconWalk className="text-muted-foreground size-6" />
              )}
            </TooltipTrigger>

            <TooltipContent>{row.original.level_of_service}</TooltipContent>
          </Tooltip>
        </div>
      );
    },
  },

  /* Make */
  {
    id: "make",
    accessorKey: "make",
    header: () => <span>Make</span>,

    cell: ({ row }) => <span className="w-24">{row.original.make}</span>,
  },

  /* Model */
  {
    id: "model",
    accessorKey: "model",
    header: () => <span>Model</span>,

    cell: ({ row }) => <span className="w-24">{row.original.model}</span>,
  },

  /* Year */
  {
    id: "year",
    accessorKey: "year",
    header: () => <span>Year</span>,

    cell: ({ row }) => <span>{row.original.year}</span>,
  },

  /* VIN */
  {
    id: "color",
    accessorKey: "color",
    header: () => <span>Color</span>,

    cell: ({ row }) => <span>{row.original.color}</span>,
  },

  /* License Plate */
  {
    id: "license_plate",
    accessorKey: "license_plate",
    header: () => <span>License Plate</span>,

    cell: ({ row }) => <span>{row.original.license_plate}</span>,
  },
];

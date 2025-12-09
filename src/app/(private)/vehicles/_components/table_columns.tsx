"use client";

/* Table Imports */
import { type ColumnDef } from "@tanstack/react-table";

/* Shadcn Imports */
import { Button } from "~/app/_components/ui/button";

/* Component Imports */
import TableColumnHeader from "~/app/(private)/_components/data_table_column_header";

/* Store Imports */
import { useDrawerStore } from "~/store/useTableStore";

export const tableColumns: ColumnDef<any>[] = [
  /* LOS */
  {
    id: "level_of_service",
    accessorKey: "level_of_service",
    header: () => <span className="w-24">LOS</span>,

    cell: ({ row }) => (
      <span className="w-24 capitalize">{row.original.level_of_service}</span>
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
        <span>
          <Button variant="link" className="" onClick={handleClick}>
            {row.original.public_id}
          </Button>
        </span>
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

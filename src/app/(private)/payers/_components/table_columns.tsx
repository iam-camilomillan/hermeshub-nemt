"use client";

/* Table Imports */
import { type ColumnDef } from "@tanstack/react-table";

/* Shadcn Imports */
import { Button } from "~/app/_components/ui/button";

/* Component Imports */
import TableColumnHeader from "~/app/(private)/_components/data_table_column_header";
import CopyableItem from "~/app/(private)/_components/copyable_item";

/* Store Imports */
import { useDrawerStore } from "~/store/useTableStore";

export const tableColumns: ColumnDef<any>[] = [
  /* Id */
  {
    id: "id",
    accessorKey: "id",
    header: () => <span className="w-24">Payer Id</span>,

    cell: ({ row }) => <span className="w-24">{row.original.public_id}</span>,
  },

  /* Name */
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => <TableColumnHeader column={column} title="Name" />,

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
            {row.original.name}
          </Button>
        </span>
      );
    },
  },

  /* Email */
  {
    id: "email",
    accessorKey: "email",
    header: () => <span>Email</span>,

    cell: ({ row }) => (
      <CopyableItem value={row.original.email}>
        {row.original.email}
      </CopyableItem>
    ),
  },

  /* Additional Email */
  {
    id: "additional_email",
    accessorKey: "additional_email",
    header: () => <span>Additional Email</span>,

    cell: ({ row }) => <span>{row.original.additional_email}</span>,
  },

  /* Phone */
  {
    id: "phone",
    accessorKey: "phone",
    header: () => <span>Phone</span>,

    cell: ({ row }) => <span>{row.original.phone_number}</span>,
  },

  /* Additional Phone */
  {
    id: "additional_phone",
    accessorKey: "additional_phone",
    header: () => <span>Additional Phone</span>,

    cell: ({ row }) => <span>{row.original.additional_phone_number}</span>,
  },

  /* Label Color */
  {
    id: "label_color",
    accessorKey: "label_color",
    header: () => <span>Color</span>,

    cell: ({ row }) => (
      <div
        className="h-4 w-8 rounded-full"
        style={{ backgroundColor: row.original.label_color }}
      />
    ),
  },
];

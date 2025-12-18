"use client";

/* Shadcn Imports */
import { Button } from "~/app/_components/ui/button";

/* Icons Imports */
import { IconMail, IconPhoneOutgoing } from "@tabler/icons-react";

/* Component Imports */
import TableColumnHeader from "~/app/(private)/_components/table-column-header";
import CopyableItem from "~/app/(private)/_components/copyable-item";

/* Store Imports */
import { useDrawerStore } from "~/store/use-drawer-store";

/* Utils Imports */
import { parsePhoneNumberFromString } from "libphonenumber-js";

/* Type Imports */
import { type ColumnDef } from "@tanstack/react-table";

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

    cell: ({ row }) =>
      row.original.email ? (
        <div className="flex items-center gap-1">
          <CopyableItem value={row.original.email}>
            {row.original.email}
          </CopyableItem>

          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${row.original.email}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconMail className="size-4" />
          </a>
        </div>
      ) : null,
  },

  /* Additional Email */
  {
    id: "additional_email",
    accessorKey: "additional_email",
    header: () => <span>Additional Email</span>,

    cell: ({ row }) =>
      row.original.additional_email ? (
        <div className="flex items-center gap-1">
          <CopyableItem value={row.original.additional_email}>
            {row.original.additional_email}
          </CopyableItem>

          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${row.original.additional_email}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconMail className="size-4" />
          </a>
        </div>
      ) : null,
  },

  /* Phone */
  {
    id: "phone",
    accessorKey: "phone",
    header: () => <span>Phone</span>,

    cell: ({ row }) => {
      /* Format phone number */
      const formattedPhoneNumber = parsePhoneNumberFromString(
        row.original.phone_number,
        "US",
      )?.formatNational();

      return row.original.phone_number ? (
        <div className="flex items-center gap-1">
          <CopyableItem value={row.original.phone_number}>
            {formattedPhoneNumber
              ? formattedPhoneNumber
              : row.original.phone_number}
          </CopyableItem>

          <a href={`tel:${row.original.phone_number}`}>
            <IconPhoneOutgoing className="size-4" />
          </a>
        </div>
      ) : null;
    },
  },

  /* Additional Phone */
  {
    id: "additional_phone",
    accessorKey: "additional_phone",
    header: () => <span>Additional Phone</span>,

    cell: ({ row }) => {
      /* Format phone number */
      const formattedPhoneNumber = parsePhoneNumberFromString(
        row.original.additional_phone_number,
        "US",
      )?.formatNational();

      return row.original.additional_phone_number ? (
        <div className="flex items-center gap-1">
          <CopyableItem value={row.original.additional_phone_number}>
            {formattedPhoneNumber
              ? formattedPhoneNumber
              : row.original.additional_phone_number}
          </CopyableItem>

          <a href={`tel:${row.original.additional_phone_number}`}>
            <IconPhoneOutgoing className="size-4" />
          </a>
        </div>
      ) : null;
    },
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

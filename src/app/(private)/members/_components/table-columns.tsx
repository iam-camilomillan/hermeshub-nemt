"use client";

/* Shadcn Imports */
import { Button } from "~/app/_components/ui/button";

/* Icons Imports */
import { IconPhoneOutgoing } from "@tabler/icons-react";

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
  /* Public Id */
  {
    id: "public_id",
    accessorKey: "public_id",
    header: () => <span className="w-24">Member Id</span>,

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

      const fullName = `${row.original.first_name} ${row.original.last_name}`;

      return (
        <span>
          <Button variant="link" className="" onClick={handleClick}>
            {fullName}
          </Button>
        </span>
      );
    },
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
      if (!row.original.additional_phone_number) return null;

      /* Format phone number */
      const formattedPhoneNumber = parsePhoneNumberFromString(
        row.original.additional_phone_number,
        "US",
      )?.formatNational();

      return (
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
      );
    },
  },

  /* Address */
  {
    id: "address",
    accessorKey: "address",
    header: () => <span>Address</span>,
    cell: ({ row }) => <span>{row.original.address ?? "-"}</span>,
  },
];

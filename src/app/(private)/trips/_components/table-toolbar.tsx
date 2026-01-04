"use client";

/* React Imports */
import { useState } from "react";

/* Shadcn Imports */
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/app/_components/ui/dialog";
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
import { toast } from "sonner";

/* Icons Imports */
import { IconPlus, IconRefresh, IconX } from "@tabler/icons-react";

/* Components Imports */
import TableDateFilter from "~/app/(private)/trips/_components/table-date-filter";
import TableRowFilter from "~/app/(private)/trips/_components/table-row-filter";

/* Store Imports */
import { useDrawerStore } from "~/store/use-drawer-store";

/* API Imports */
import { api } from "~/trpc/react";

/* Utils Imports */
import { tableFilterSettings } from "~/app/(private)/trips/utils/table-filter-settings";
import Papa from "papaparse";

/* Type Imports */
import { type Table } from "@tanstack/react-table";

/* TableToolbar Props */
interface TableToolbarProps<TData> {
  table: Table<TData>;
}

const TableToolbar = <TData,>({ table }: TableToolbarProps<TData>) => {
  /* Local states */
  const [rotating, setRotating] = useState(false);
  const [searchBy, setSearchBy] = useState(
    tableFilterSettings.searchBy.defaultValue,
  );
  const [selectedPayer, setSelectedPayer] = useState<
    "ALIVI" | "MODIVCARE" | "SAFERIDE" | "ACCESS TO CARE" | "ROUTEGENIE"
  >("ALIVI");
  const [file, setFile] = useState<File | null>(null);

  const isFiltered = table?.getState().columnFilters.length > 0;

  /* TRPC Utils */
  const utils = api.useUtils();

  /* TRPC Mutation */
  const importTrips = api.trip.importTrips.useMutation({
    onSuccess: async (data) => {
      toast.success(`Imported ${data.count} trips successfully`);
      setFile(null);
      await utils.trip.readTrips.invalidate();
    },
    onError: (error) => {
      toast.error(`Error importing trips: ${error.message}`);
    },
  });

  /* Import items action */
  const handleImportButton = () => {
    if (!file) {
      toast.error("Please select a file to import");
      return;
    }

    if (!selectedPayer) {
      toast.error("Please select a payer");
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          toast.error("Error parsing CSV file");
          console.error(results.errors);
          return;
        }

        const trips = results.data as Record<string, any>[];
        importTrips.mutate({
          trips,
          payer: selectedPayer,
        });
      },
      error: (error: Error) => {
        toast.error(`Error parsing CSV file: ${error.message}`);
      },
    });
  };

  /* Add item action */
  const handleAddButton = () => {
    useDrawerStore.setState({ isDrawerOpen: true });
  };

  /* Refresh table action */
  const handleRefreshButton = async () => {
    setRotating(true);

    useDrawerStore.setState({ refreshData: true });

    setTimeout(() => {
      setRotating(false);
    }, 300);
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

      {/* Date filter */}
      <TableDateFilter table={table} />

      {/* Row filter */}
      <TableRowFilter
        column={table.getColumn("status")}
        title="Status"
        options={[
          { label: "Completed", value: "Completed" },
          { label: "Will Call", value: "Will Call" },
          { label: "Canceled", value: "Canceled" },
          { label: "Unassigned", value: "unassigned" },
        ]}
      />

      {/* Reset filter if there is selection */}
      {isFiltered && (
        <Button variant="ghost" onClick={() => table?.resetColumnFilters()}>
          Reset All
          <IconX />
        </Button>
      )}

      {/* Import items button */}
      <Dialog>
        <DialogTrigger asChild>
          {/* Import items button */}
          <Button size={"sm"} className="ml-auto">
            <IconPlus />
            <span>Import Trips</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Import Trips</DialogTitle>
            <DialogDescription>Import trips from a CSV file.</DialogDescription>
          </DialogHeader>

          {/* Select payer and csv input */}
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium">Payer</span>
              <Select
                value={selectedPayer}
                onValueChange={(value: any) => setSelectedPayer(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALIVI">ALIVI</SelectItem>
                  <SelectItem value="MODIVCARE">MODIVCARE</SelectItem>
                  <SelectItem value="SAFERIDE">SAFERIDE</SelectItem>
                  <SelectItem value="ACCESS TO CARE">ACCESS TO CARE</SelectItem>
                  <SelectItem value="ROUTEGENIE">ROUTEGENIE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium">CSV File</span>
              <Input
                type="file"
                accept=".csv"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFile(file);
                  }
                }}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button
              onClick={handleImportButton}
              disabled={importTrips.isPending}
            >
              {importTrips.isPending ? "Importing..." : "Import"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add item button */}
      <Button size={"sm"} onClick={handleAddButton}>
        <IconPlus />
        <span>Add Trip</span>
      </Button>

      {/* Refresh table button */}
      <Button
        size={"sm"}
        variant="ghost"
        onClick={handleRefreshButton}
        className="group"
      >
        <IconRefresh
          className={`transition-transform duration-300 ease-in-out group-hover:-rotate-90`}
          style={
            rotating
              ? { transform: "rotate(-180deg)" }
              : { transform: "rotate(0deg)" }
          }
        />
      </Button>
    </div>
  );
};

export default TableToolbar;

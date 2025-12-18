"use client";

/* React Imports */
import { useEffect } from "react";

/* Components Imports */
import DataTable from "~/app/(private)/_components/data-table";
import TableToolbar from "~/app/(private)/trips/_components/table-toolbar";
import TableFooter from "~/app/(private)/trips/_components/table-footer";
import { tableColumns } from "~/app/(private)/trips/_components/table-columns";
import Drawer from "~/app/(private)/trips/_components/drawer";

/* Store Imports */
import { useDrawerStore } from "~/store/use-drawer-store";

/* API Imports */
import { api } from "~/trpc/react";

const Trips = () => {
  /* Global states */
  const refreshData = useDrawerStore((state) => state.refreshData);

  /* API request */
  const { data, isFetching, refetch } = api.trip.readTrips.useQuery();

  /* Data refresh */
  useEffect(() => {
    if (refreshData) {
      refetch();
      useDrawerStore.setState({ refreshData: false });
    }
  }, [refreshData]);

  return (
    <main className="flex h-full flex-col p-2">
      <DataTable
        data={data ?? []}
        isLoading={isFetching}
        TableToolbar={TableToolbar}
        TableFooter={TableFooter}
        tableColumns={tableColumns}
      />

      <Drawer />
    </main>
  );
};

export default Trips;

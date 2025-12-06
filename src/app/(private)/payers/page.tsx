"use client";

/* React Imports */
import { useEffect } from "react";

/* Components Imports */
import DataTable from "~/app/(private)/_components/data_table";
import TableToolbar from "~/app/(private)/payers/_components/table_toolbar";
import TableFooter from "~/app/(private)/payers/_components/table_footer";
import { tableColumns } from "~/app/(private)/payers/_components/table_columns";
import Drawer from "~/app/(private)/payers/_components/drawer";

/* Store Imports */
import { useDrawerStore } from "~/store/useTableStore";

/* API Imports */
import { api } from "~/trpc/react";

export default function Payers() {
  /* Global States */
  const refreshData = useDrawerStore((state) => state.refreshData);

  /* API Request */
  const { data, isFetching, refetch } = api.payer.readPayers.useQuery();

  /* Data Refresh */
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
}

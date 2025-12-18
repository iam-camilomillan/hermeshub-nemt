import "server-only";

/* React Imports */
import { cache } from "react";

/* Next Imports */
import { headers } from "next/headers";

/* TRPC Imports */
import { createHydrationHelpers } from "@trpc/react-query/rsc";

/* Utils Imports */
import { createTRPCContext } from "~/server/api/trpc";
import { createQueryClient } from "~/trpc/query-client";
import { createCaller, type AppRouter } from "~/server/api/root";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(await headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
  });
});

const getQueryClient = cache(createQueryClient);
const caller = createCaller(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
);

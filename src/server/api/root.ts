/* tRPC Imports */
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/* Routers Imports */
import { payerRouter } from "~/server/api/routers/payer";
import { vehicleRouter } from "~/server/api/routers/vehicle";
import { tripRouter } from "~/server/api/routers/trip";
import { memberRouter } from "~/server/api/routers/member";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  payer: payerRouter,
  vehicle: vehicleRouter,
  trip: tripRouter,
  member: memberRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);

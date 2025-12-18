/* TRPC Imports */
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

/* Zod Imports */
import { z } from "zod";

/* Drizzle Imports */
import { eq } from "drizzle-orm";

/* DB Imports */
import { trip } from "~/server/db/schema";

export const tripRouter = createTRPCRouter({
  saveTrip: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        public_id: z.string(),
        status: z.string(),
        date: z.string(),
        scheduled_pickup_time: z.string(),
        actual_pickup_time: z.string(),
        scheduled_dropoff_time: z.string(),
        actual_dropoff_time: z.string(),
        pickup_address: z.string(),
        pickup_location_type: z.string(),
        dropoff_address: z.string(),
        dropoff_location_type: z.string(),
        label_color: z.string(),
        signature_at_pu: z.boolean(),
        signature_at_do: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.id) {
        await ctx.db
          .update(trip)
          .set({
            public_id: input.public_id,
            status: input.status,
            date: input.date,
            scheduled_pickup_time: input.scheduled_pickup_time,
            actual_pickup_time: input.actual_pickup_time,
            scheduled_dropoff_time: input.scheduled_dropoff_time,
            actual_dropoff_time: input.actual_dropoff_time,
            pickup_address: input.pickup_address,
            pickup_location_type: input.pickup_location_type,
            dropoff_address: input.dropoff_address,
            dropoff_location_type: input.dropoff_location_type,

            companyId: ctx.session.user.companyId,

            updatedAt: new Date(),
          })
          .where(eq(trip.id, input.id));
      } else {
        await ctx.db.insert(trip).values({
          id: crypto.randomUUID(),

          public_id: input.public_id,
          status: input.status,
          date: input.date,
          scheduled_pickup_time: input.scheduled_pickup_time,
          actual_pickup_time: input.actual_pickup_time,
          scheduled_dropoff_time: input.scheduled_dropoff_time,
          actual_dropoff_time: input.actual_dropoff_time,
          pickup_address: input.pickup_address,
          pickup_location_type: input.pickup_location_type,
          dropoff_address: input.dropoff_address,
          dropoff_location_type: input.dropoff_location_type,
          createdAt: new Date(),
          updatedAt: new Date(),

          companyId: ctx.session.user.companyId,
        });
      }
    }),

  readTrips: protectedProcedure.query(async ({ ctx }) => {
    const trips = await ctx.db.query.trip.findMany({});

    return trips ?? null;
  }),
});

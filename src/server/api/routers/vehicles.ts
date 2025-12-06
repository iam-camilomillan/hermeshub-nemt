/* TRPC Imports */
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

/* Zod Imports */
import { z } from "zod";

/* Drizzle Imports */
import { eq } from "drizzle-orm";

/* DB Imports */
import { vehicle } from "~/server/db/schema";

export const vehicleRouter = createTRPCRouter({
  saveVehicle: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        public_id: z.string(),
        name: z.string(),
        make: z.string(),
        model: z.string(),
        year: z.string(),
        vin: z.string(),
        license_plate: z.string(),
        color: z.string(),
        registration_date: z.string(),
        registration_expiration_date: z.string(),
        mileage: z.string(),
        level_of_service: z.string(),
        base_location: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.id) {
        await ctx.db
          .update(vehicle)
          .set({
            public_id: input.public_id,
            name: input.name,
            make: input.make,
            model: input.model,
            year: input.year,
            vin: input.vin,
            license_plate: input.license_plate,
            color: input.color,
            registration_date: input.registration_date,
            registration_expiration_date: input.registration_expiration_date,
            mileage: input.mileage,
            level_of_service: input.level_of_service,
            base_location: input.base_location,

            companyId: ctx.session.user.companyId,

            updatedAt: new Date(),
          })
          .where(eq(vehicle.id, input.id));
      } else {
        await ctx.db.insert(vehicle).values({
          id: crypto.randomUUID(),

          public_id: input.public_id,
          name: input.name,
          make: input.make,
          model: input.model,
          year: input.year,
          vin: input.vin,
          license_plate: input.license_plate,
          color: input.color,
          registration_date: input.registration_date,
          registration_expiration_date: input.registration_expiration_date,
          mileage: input.mileage,
          level_of_service: input.level_of_service,
          base_location: input.base_location,

          createdAt: new Date(),
          updatedAt: new Date(),

          companyId: ctx.session.user.companyId,
        });
      }
    }),

  readVehicles: protectedProcedure.query(async ({ ctx }) => {
    const vehicles = await ctx.db.query.vehicle.findMany({});

    return vehicles ?? null;
  }),
});

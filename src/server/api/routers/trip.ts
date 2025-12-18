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
        pickup_location_name: z.string(),
        dropoff_address: z.string(),
        dropoff_location_name: z.string(),
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
            pickup_location_name: input.pickup_location_name,
            dropoff_address: input.dropoff_address,
            dropoff_location_name: input.dropoff_location_name,

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
          pickup_location_name: input.pickup_location_name,
          dropoff_address: input.dropoff_address,
          dropoff_location_name: input.dropoff_location_name,

          // Defaults for missing fields required by schema
          payer_trip_id: "MANUAL",
          pickup_phone_number: "",
          dropoff_phone_number: "",
          payer_passenger_id: "MANUAL",
          passenger_first_name: "Unknown",
          passenger_last_name: "Unknown",
          passenger_phone_number: "",
          passenger_date_of_birth: new Date().toISOString().split("T")[0]!,
          level_of_service: "Ambulatory",
          mileage: "0",
          payer_id: "MANUAL",

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

  importTrips: protectedProcedure
    .input(
      z.object({
        trips: z.array(z.record(z.string(), z.any())),
        payer: z.enum(["ALIVI", "MODIVCARE", "SAFERIDE", "ACCESS TO CARE"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { trips, payer } = input;
      const validTrips: (typeof trip.$inferInsert)[] = [];

      for (const row of trips) {
        let mappedTrip: any = {};

        // Helper to find value by possible keys
        const getValue = (keys: string[]) => {
          for (const key of keys) {
            if (
              row[key] !== undefined &&
              row[key] !== null &&
              row[key] !== ""
            ) {
              return row[key];
            }
          }
          return undefined;
        };

        if (payer === "ALIVI") {
          mappedTrip = {
            payer_trip_id: getValue(["Ref. No."]),

            date: getValue(["Ride Date"]),
            scheduled_pickup_time:
              getValue(["Suggested P/U Time"]) === "WillCall"
                ? null
                : getValue(["Suggested P/U Time"]),
            scheduled_dropoff_time:
              getValue(["Appointment Time"]) === "WillCall"
                ? null
                : getValue(["Appointment Time"]),
            pickup_address: getValue(["Pickup Addr"]),
            pickup_location_name: getValue(["OriginName"]),
            pickup_phone_number: getValue(["Contact No."]) ?? "",
            dropoff_address: getValue(["Drop Off Addr"]),
            dropoff_location_name: getValue(["DestinationName"]),
            dropoff_phone_number: getValue(["Drop Off Contact No."]) ?? "",
            payer_passenger_id: getValue(["SubscriberID"]),
            passenger_first_name: getValue(["First Name"]),
            passenger_last_name: getValue(["Last Name"]),
            passenger_phone_number: getValue(["Contact No."]) ?? "",

            level_of_service: getValue(["Service Type"]),
            mileage: getValue(["Mileage"]),
            notes: getValue(["Notes"]) ?? "",
          };

          console.log(mappedTrip);
        } else if (payer === "MODIVCARE") {
          mappedTrip = {
            payer_trip_id: getValue(["Job Number", "Job #", "Trip ID"]),
            date: getValue(["Transport Date", "Date"]),
            scheduled_pickup_time: getValue(["Pickup Time", "Appt Time"]),
            scheduled_dropoff_time: getValue(["Appt Time", "Dropoff Time"]), // Modivcare often has appt time which is dropoff for A leg
            pickup_address: getValue(["Pick Up Address", "Pickup Address"]),
            pickup_location_name:
              getValue(["Pick Up Facility Name", "Facility"]) ?? "Residence",
            pickup_phone_number: getValue(["Pick Up Phone", "Phone"]) ?? "",
            dropoff_address: getValue(["Drop Off Address", "Dropoff Address"]),
            dropoff_location_name:
              getValue(["Drop Off Facility Name"]) ?? "Residence",
            dropoff_phone_number: getValue(["Drop Off Phone"]) ?? "",
            payer_passenger_id: getValue(["Member ID", "Subscription ID"]),
            passenger_first_name: getValue(["Member First Name", "First Name"]),
            passenger_last_name: getValue(["Member Last Name", "Last Name"]),
            passenger_phone_number: getValue(["Member Phone", "Phone"]),
            passenger_date_of_birth: getValue(["Member DOB", "DOB"]),
            level_of_service: getValue(["Service Level", "LOS"]),
            mileage: getValue(["Mileage", "Authorized Mileage"]),
            notes: getValue(["Comments", "Notes"]),
          };
        }

        // Common defaults and simple validations
        if (!mappedTrip.payer_trip_id) {
          console.log(mappedTrip);
          continue;
        } // Skip if no ID

        const tripData: typeof trip.$inferInsert = {
          id: crypto.randomUUID(),
          public_id: `TRIP-${Math.floor(Math.random() * 100000)}`, // Simple generation
          status: "unassigned",

          payer_trip_id: String(mappedTrip.payer_trip_id),
          date: mappedTrip.date as string,
          scheduled_pickup_time: mappedTrip.scheduled_pickup_time
            ? String(mappedTrip.scheduled_pickup_time)
            : null,
          scheduled_dropoff_time: mappedTrip.scheduled_dropoff_time
            ? String(mappedTrip.scheduled_dropoff_time)
            : null,

          pickup_address: String(mappedTrip.pickup_address || "Unknown"),
          pickup_location_name: String(
            mappedTrip.pickup_location_name || "Unknown",
          ),
          pickup_phone_number: String(mappedTrip.pickup_phone_number || ""),
          dropoff_address: String(mappedTrip.dropoff_address || "Unknown"),
          dropoff_location_name: String(
            mappedTrip.dropoff_location_name || "Unknown",
          ),
          dropoff_phone_number: String(mappedTrip.dropoff_phone_number || ""),

          payer_passenger_id: String(
            mappedTrip.payer_passenger_id || "Unknown",
          ),
          passenger_first_name: String(
            mappedTrip.passenger_first_name || "Unknown",
          ),
          passenger_last_name: String(mappedTrip.passenger_last_name || ""),
          passenger_phone_number: String(
            mappedTrip.passenger_phone_number || "",
          ),
          passenger_date_of_birth:
            (mappedTrip.passenger_date_of_birth as string) || null,

          level_of_service: String(mappedTrip.level_of_service),
          mileage: String(mappedTrip.mileage),

          notes: String(mappedTrip.notes),

          payer_id: payer,
          companyId: ctx.session.user.companyId,

          createdAt: new Date(),
          updatedAt: new Date(),
        };

        validTrips.push(tripData);
      }

      if (validTrips.length > 0) {
        await ctx.db
          .insert(trip)
          .values(validTrips)
          .catch((e) => {
            console.log(e);
          });
      }

      return { success: true, count: validTrips.length };
    }),
});

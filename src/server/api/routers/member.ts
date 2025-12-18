/* TRPC Imports */
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

/* Zod Imports */
import { z } from "zod";

/* Drizzle Imports */
import { eq } from "drizzle-orm";

/* DB Imports */
import { member } from "~/server/db/schema";

export const memberRouter = createTRPCRouter({
  saveMember: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        public_id: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        phone_number: z.string(),
        additional_phone_number: z.string().optional(),
        address: z.string().optional(),
        address_location_type: z.string().optional(),
        additional_address: z.string().optional(),
        additional_address_location_type: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.id) {
        await ctx.db
          .update(member)
          .set({
            public_id: input.public_id,
            first_name: input.first_name,
            last_name: input.last_name,
            phone_number: input.phone_number,
            additional_phone_number: input.additional_phone_number,
            address: input.address,
            address_location_type: input.address_location_type,
            additional_address: input.additional_address,
            additional_address_location_type:
              input.additional_address_location_type,

            companyId: ctx.session.user.companyId,

            updatedAt: new Date(),
          })
          .where(eq(member.id, input.id));
      } else {
        await ctx.db.insert(member).values({
          id: crypto.randomUUID(),

          public_id: input.public_id,
          first_name: input.first_name,
          last_name: input.last_name,
          phone_number: input.phone_number,
          additional_phone_number: input.additional_phone_number,
          address: input.address,
          address_location_type: input.address_location_type,
          additional_address: input.additional_address,
          additional_address_location_type:
            input.additional_address_location_type,

          createdAt: new Date(),
          updatedAt: new Date(),

          companyId: ctx.session.user.companyId,
        });
      }
    }),

  readMembers: protectedProcedure.query(async ({ ctx }) => {
    const members = await ctx.db.query.member.findMany({});

    return members ?? null;
  }),
});

/* TRPC Imports */
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

/* Zod Imports */
import { z } from "zod";

/* Drizzle Imports */
import { eq } from "drizzle-orm";

/* DB Imports */
import { payer } from "~/server/db/schema";

export const payerRouter = createTRPCRouter({
  savePayer: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        public_id: z.string(),
        name: z.string(),
        email: z.string(),
        additional_email: z.string(),
        phone_number: z.string(),
        additional_phone_number: z.string(),
        label_color: z.string(),
        signature_at_pu: z.boolean(),
        signature_at_do: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.id) {
        await ctx.db
          .update(payer)
          .set({
            public_id: input.public_id,
            name: input.name,
            email: input.email,
            additional_email: input.additional_email,
            phone_number: input.phone_number,
            additional_phone_number: input.additional_phone_number,
            label_color: input.label_color,
            signature_at_pu: input.signature_at_pu,
            signature_at_do: input.signature_at_do,

            companyId: ctx.session.user.companyId,

            updatedAt: new Date(),
          })
          .where(eq(payer.id, input.id));
      } else {
        await ctx.db.insert(payer).values({
          id: crypto.randomUUID(),

          public_id: input.public_id,
          name: input.name,
          email: input.email,
          additional_email: input.additional_email,
          phone_number: input.phone_number,
          additional_phone_number: input.additional_phone_number,
          label_color: input.label_color,
          signature_at_pu: input.signature_at_pu,
          signature_at_do: input.signature_at_do,
          createdAt: new Date(),
          updatedAt: new Date(),

          companyId: ctx.session.user.companyId,
        });
      }
    }),

  readPayers: protectedProcedure.query(async ({ ctx }) => {
    const payer = await ctx.db.query.payer.findMany({});

    return payer ?? null;
  }),
});

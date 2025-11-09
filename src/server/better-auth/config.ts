/* BetterAuth Imports */
import { betterAuth } from "better-auth";

/* Adapters Imports */
import { drizzleAdapter } from "better-auth/adapters/drizzle";

/* DB Imports */
import { db } from "~/server/db";

/* ENV Imports */
import { env } from "~/env";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "pg" or "mysql"
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {},
});

export type Session = typeof auth.$Infer.Session;

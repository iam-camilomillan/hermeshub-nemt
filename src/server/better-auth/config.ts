/* BetterAuth Imports */
import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins/username";

/* Adapters Imports */
import { drizzleAdapter } from "better-auth/adapters/drizzle";

/* DB Imports */
import { db } from "~/server/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 30,
    updateAge: 60 * 60 * 24,
  },
  user: {
    additionalFields: {
      first_name: {
        type: "string",
        required: true,
      },
      last_name: {
        type: "string",
        required: true,
      },
      role: {
        type: "string",
        required: true,
      },
      companyId: {
        type: "string",
        required: true,
      },
    },
  },
  pages: {
    signIn: "/login",
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    username({
      usernameValidator: (username) => {
        return /^[a-zA-Z0-9_.@]+$/.test(username);
      },
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;

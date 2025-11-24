/* Drizzle Imports */
import { type Config } from "drizzle-kit";

/* ENV Imports */
import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["hermeshub-nemt_*"],
} satisfies Config;

/* React Imports */
import { cache } from "react";

/* Next Imports */
import { headers } from "next/headers";

/* Auth Imports */
import { auth } from "~/server/better-auth";

export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() }),
);

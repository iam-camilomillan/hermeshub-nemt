/* BetterAuth Imports */
import { toNextJsHandler } from "better-auth/next-js";

/* Server Imports */
import { auth } from "~/server/better-auth";

export const { GET, POST } = toNextJsHandler(auth.handler);

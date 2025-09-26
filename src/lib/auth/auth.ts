import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";

import { db } from "../server/db";
import { send_email } from "$lib/notifications/send_email";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ( { user, url, token }, request) => {
      await send_email(
        user.email,
        "Verify your email address",
        `Click the link to verify your email: ${url}`,
      );
    },
  },
  plugins: [sveltekitCookies(getRequestEvent)], // make sure this is the last plugin in the array
});

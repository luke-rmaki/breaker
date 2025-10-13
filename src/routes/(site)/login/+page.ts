import { auth_client } from "$lib/auth/auth-client";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export async function load() {
  const { data: session } = await auth_client.getSession();

  if (session) {
    throw redirect(302, "/breaker");
  }

  // No session, allow page to load for login
  return {
    session: null,
  };
}

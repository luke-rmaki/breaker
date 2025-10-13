import { error, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { auth } from "$lib/auth/auth";

export async function load({ request }): RequestHandler {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (session?.user) {
    redirect(303, "/breaker");
  }
}

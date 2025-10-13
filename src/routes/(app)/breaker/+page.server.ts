import { auth } from "$lib/auth/auth";
import { db } from "$lib/server/db/index";
import { breaker } from "$lib/server/db/schema.js";
import { eq } from "drizzle-orm";

/** @satisfies {import('./$types').Actions} */
export const actions = {
  create: async ({ request, fetch }) => {
    const data = await request.formData();
    const breaker_name = data.get("breaker");
    if (typeof breaker_name === "string") {
      const id = crypto.randomUUID();
      const response = await fetch(`/api/breaker/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: breaker_name, id }),
      });
      console.log(response);
      if (!response.ok) {
        return { success: false, message: "Breaker not created" };
      }
      return { success: true, message: "Breaker created successfully" };
    }
  },
};

export async function load({ request }) {
  const session = await auth.api.getSession(request);
  if (!session?.user) {
    return { breakers: [] };
  }
  const breakers = await db.select().from(breaker).where(
    eq(breaker.user_id, session.user.id),
  );
  return { breakers };
}

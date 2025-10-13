import { json, type RequestHandler } from "@sveltejs/kit";
import { auth } from "$lib/auth/auth";
import { breaker, BreakerSchemaIns } from "$lib/server/db/schema";
import { db } from "$lib/server/db";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const POST: RequestHandler = async ({ request }) => {
  // check if user is authenticated
  const session = await auth.api.getSession(request);
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  // extract and validate data
  const raw_data = await request.json();
  raw_data.user_id = session.user.id;
  try {
    const new_breaker = BreakerSchemaIns.parse(raw_data);
    await db.insert(breaker).values(new_breaker);
    return json(new_breaker);
  } catch (_e) {
    if (_e instanceof z.ZodError) {
      return new Response("Invalid data", { status: 400 });
    } else {
      return new Response("Server error", { status: 500 });
    }
  }
};

export const GET: RequestHandler = async ({ request }) => {
  const session = await auth.api.getSession(request);
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }
  const url = new URL(request.url);
  const breaker_id = url.pathname.split("/").pop();

  if (!breaker_id) {
    return new Response("Bad Request", { status: 400 });
  }

  const result = await db
    .selectDistinct()
    .from(breaker)
    .where(eq(breaker.id, breaker_id));

  if (result.length === 0) {
    return new Response("Not Found", { status: 404 });
  }

  return json(result[0]);
};

export const DELETE: RequestHandler = async ({ request }) => {
  const session = await auth.api.getSession(request);
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }
  return json({ message: "DELETE request received!" });
};

export const PUT: RequestHandler = async ({ request }) => {
  const session = await auth.api.getSession(request);
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }
  const url = new URL(request.url);
  const breaker_id = url.pathname.split("/").pop();

  if (!breaker_id) {
    return new Response("Bad Request", { status: 400 });
  }

  const res = await request.json();
  const new_name = res.name;

  if (typeof new_name !== "string" || new_name.trim() === "") {
    return new Response("Invalid name", { status: 400 });
  }

  try {
    await db.update(breaker)
      .set({ name: new_name })
      .where(eq(breaker.id, breaker_id));

    const result = await db
      .selectDistinct()
      .from(breaker)
      .where(eq(breaker.id, breaker_id));

    if (result.length === 0) {
      return new Response("Updated Breaker not found", { status: 404 });
    }

    return json(result[0]);
  } catch (_e) {
    return new Response("Server error", { status: 500 });
  }
};

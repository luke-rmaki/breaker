import { json, type RequestHandler } from "@sveltejs/kit";
import { auth } from "$lib/auth/auth";
import { breaker, BreakerSchemaIns } from "$lib/server/db/schema";
import { db } from "$lib/server/db";
import { z } from "zod";

export const POST: RequestHandler = async ({ request }) => {
  // check if user is authenticated
  const session = await auth.api.getSession(request);
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  // extract and validate data
  const raw_data = await request.json();
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

  return json({ message: "Hello from the breaker API!" });
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
  const { a, b } = await request.json();
  return json(a * b);
};

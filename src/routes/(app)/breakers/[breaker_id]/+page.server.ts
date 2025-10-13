import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, fetch, depends }) {
  depends("app:breaker"); // rerun load when form is submitted
  const res = await fetch(`/api/breaker/${params.breaker_id}`);
  const data = await res.json();
  if (res.status === 404) {
    throw error(404, "Not found");
  }
  return data;
}

export const actions = {
  update: async ({ params, fetch, request }) => {
    const form_data = await request.formData();
    const name = form_data.get("name");
    const res = await fetch(`/api/breaker/${params.breaker_id}`, {
      method: "PUT",
      body: JSON.stringify({ name }),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      return { success: false, message: "Failed to update description" };
    }
    return {
      success: true,
      message: "Description updated successfully",
      data: await res.json(),
    };
  },
};

import { adminClient } from "~/supa-client";
import { deleteUser } from "../mutations";
import type { Route } from "../pages/+types/dashboard-ideas-page";

export const action = async ({ request }: Route.ActionArgs) => {
  // endpoint 보호
  if (request.method !== "POST") {
    return new Response(null, { status: 404 });
  }

  //   필요한 헤더 있는지
  const headers = request.headers.get("X-POTATO");
  if (!headers || headers !== "X-POTATO") {
    return new Response("Unauthorized", { status: 401 });
  }
  await deleteUser(adminClient);
  return Response.json({ ok: true });
};

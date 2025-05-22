import type { Route } from "./+types/join-page";
import { makeSSRClient } from "~/supa-client";
import { redirect } from "react-router";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  await client.auth.signOut();
  return redirect("/", { headers });
};

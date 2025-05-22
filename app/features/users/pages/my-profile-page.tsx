import { redirect } from "react-router";
import type { Route } from "./+types/my-profile-page";
import { makeSSRClient } from "~/supa-client";
import { getUserProfileById } from "../queries";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const {
    data: { user },
  } = await client.auth.getUser();
  if (user) {
    const profile = await getUserProfileById(client, { id: user.id });
    return redirect(`/users/${profile.username}`);
  }
  return redirect("/auth/login");
};

export default function MyProfilePage() {
  return <div>Profile</div>;
}

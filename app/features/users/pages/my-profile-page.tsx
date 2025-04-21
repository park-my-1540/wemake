import { redirect } from "react-router";

export const loader = () => {
  return redirect("/users/nico");
};

export default function MyProfilePage() {
  return <div>Profile</div>;
}

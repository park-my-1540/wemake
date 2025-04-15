import { data, redirect } from "react-router";
import type { Route } from "./+types/leaderboards-redirection-page";
import { DateTime } from "luxon";
export function loader({ request }: Route.LoaderArgs) {
  const period = new URL(request.url).pathname.split("/").pop();

  const today = DateTime.now().setZone("Asia/Seoul");

  let url: string;
  if (period === "daily") {
    url = `/products/leaderboards/daily/${today.year}/${today.month}/${today.day}`;
  } else if (period === "weekly") {
    url = `/products/leaderboards/weekly/${today.year}/${today.weekNumber}`;
  } else if (period === "monthly") {
    url = `/products/leaderboards/monthly/${today.year}/${today.month}`;
  } else if (period === "yearly") {
    url = `/products/leaderboards/yearly/${today.year}`;
  } else {
    return data(null, { status: 400 });
  }
  return redirect(url);
}

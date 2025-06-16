import type { Route } from "~/features/products/pages/+types/index";
import { data, useOutletContext } from "react-router";
import { Outlet } from "react-router";
import { z } from "zod";

const searchParamsSchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { success, data: parsedData } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  if (!success) {
    throw data(
      {
        error_code: "invalid_page",
        message: "Invalid page",
      },
      { status: 400 }
    );
  }
};

export default function LeaderboardLayout() {
  const { isLoggedIn } = useOutletContext<{
    isLoggedIn: boolean;
  }>();
  return <Outlet context={{ isLoggedIn }} />;
}

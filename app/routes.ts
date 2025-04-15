import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";
export default [
  index("common/pages/home-page.tsx"),
  ...prefix("products", [
    // 모든 주소들이 /products 로 시작함
    index("features/products/pages/products-page.tsx"),
    ...prefix("leaderboards", [
      // 모든 주소들이 /product/leaderboards 로 시작함
      index("features/products/pages/leaderboards-page.tsx"),
      route(
        "/yearly/:year",
        "features/products/pages/yearly-leaderboard-page.tsx"
      ),
      route(
        "/monthly/:year/:month",
        "features/products/pages/monthly-leaderboard-page.tsx"
      ),
      route(
        "/weekly/:year/:month/:week",
        "features/products/pages/weekly-leaderboard-page.tsx"
      ),
      route(
        "/daily/:year/:month/:week/:day",
        "features/products/pages/daily-leaderboard-page.tsx"
      ),
    ]),
    ...prefix("categories", [
      route("/", "features/products/pages/categories-page.tsx"),
      route("/:category", "features/products/pages/category-page.tsx"),
    ]),
    route("/search", "features/products/pages/search-page.tsx"),
    route("/submit", "features/products/pages/submit-page.tsx"),
    route("/promote", "features/products/pages/promote-page.tsx"),
  ]),
] satisfies RouteConfig;

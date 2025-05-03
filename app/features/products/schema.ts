import {
  pgTable,
  text,
  bigint,
  timestamp,
  jsonb,
  uuid,
  primaryKey,
  integer,
  check,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { profiles } from "../users/schema";
export const products = pgTable("products", {
  product_id: bigint({ mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  name: text().notNull(),
  tagline: text().notNull(),
  description: text().notNull(),
  how_it_works: text().notNull(),
  icon: text().notNull(),
  url: text().notNull(),
  stats: jsonb().notNull().default({ views: 0, reviews: 0, upvotes: 0 }),
  profile_id: uuid("id").references(() => profiles.profile_id, {
    onDelete: "cascade", //이 프로필이 삭제되면 제품도 삭제됨
  }),
  category_id: bigint({ mode: "number" }).references(
    () => categories.category_id,
    {
      onDelete: "set null", //카테고리를 삭제하면 null로 변경
    }
  ),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const categories = pgTable("categories", {
  category_id: bigint({ mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  name: text().notNull(),
  description: text().notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const product_upvotes = pgTable(
  "product_upvotes",
  {
    product_id: bigint({ mode: "number" }).references(
      () => products.product_id,
      {
        onDelete: "cascade",
      }
    ),
    profile_id: uuid("id").references(() => profiles.profile_id, {
      onDelete: "cascade",
    }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.product_id, table.profile_id] }),
  })
);

export const reviews = pgTable(
  "reviews",
  {
    review_id: bigint({ mode: "number" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    product_id: bigint({ mode: "number" }).references(
      () => products.product_id,
      {
        onDelete: "cascade",
      }
    ),
    profile_id: uuid("id").references(() => profiles.profile_id, {
      onDelete: "cascade",
    }),
    rating: integer("rating").notNull(),
    review: text().notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [check("rating_check", sql`${table.rating} BETWEEN 1 AND 5`)] //SQL Injection 방지도 가능한
);

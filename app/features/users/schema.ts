import {
  pgSchema,
  pgTable,
  uuid,
  text,
  pgEnum,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";

// fake. ts가 제대로 작동하기 위해 필요
// 이미 존재하기 때문에 Supabase가 이걸 데이터베이스에 push 하는걸 허용하지 않음.
const users = pgSchema("auth").table("users", {
  id: uuid().primaryKey(),
});

export const roles = pgEnum("role", [
  "developer",
  "designer",
  "marketer",
  "pm",
]);

// 즉, 유저가 자신의 계정을 삭제하면 프로필도 함께 삭제되도록
export const profiles = pgTable("profiles", {
  profile_id: uuid("id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  avatar: text(),
  name: text().notNull(),
  username: text().notNull(),
  headline: text(),
  bio: text(),
  role: roles().default("developer").notNull(),
  stats: jsonb().$type<{
    followers: number;
    following: number;
  }>(),
  views: jsonb(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});

// 이 설정은 이 기록이 어떻게 처리될지 설정할 수 있게 해줌
// 즉, 유저가 프로필을 삭제하면 팔로워 기록도 함께 삭제되도록
export const followers = pgTable("followers", {
  follower_id: uuid("id").references(() => profiles.profile_id, {
    onDelete: "cascade",
  }),
  following_id: uuid("id").references(() => profiles.profile_id, {
    onDelete: "cascade",
  }),
  created_at: timestamp().notNull().defaultNow(),
});

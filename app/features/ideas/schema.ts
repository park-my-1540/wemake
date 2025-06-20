import {
  pgTable,
  text,
  bigint,
  timestamp,
  integer,
  uuid,
  primaryKey,
  pgPolicy,
} from "drizzle-orm/pg-core";
import { profiles } from "../users/schema";
import { authUid, serviceRole } from "drizzle-orm/supabase";
import { sql } from "drizzle-orm";

export const gptIdeas = pgTable(
  "gpt_ideas",
  {
    gpt_idea_id: bigint({ mode: "number" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    idea: text().notNull(),
    views: integer().notNull().default(0),
    claimed_at: timestamp(),
    claimed_by: uuid().references(() => profiles.profile_id, {
      onDelete: "cascade", //프로필이 삭제되면 채택된 아이디어도 삭제됨
    }),
    created_at: timestamp().notNull().defaultNow(),
  },
  (table) => [
    pgPolicy("gpt_ideas-insert-policy", {
      for: "insert",
      to: serviceRole,
      as: "permissive",
      withCheck: sql`true`,
    }),
  ]
);

export const gptIdeasLikes = pgTable(
  "gpt_ideas_likes",
  {
    gpt_idea_id: bigint({ mode: "number" }).references(
      () => gptIdeas.gpt_idea_id,
      {
        onDelete: "cascade",
      }
    ),
    profile_id: uuid().references(() => profiles.profile_id, {
      onDelete: "cascade",
    }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.gpt_idea_id, table.profile_id] }),
  })
);

// import db from "~/db";
// import { topics, posts, postUpvotes } from "./schema";
// import { asc, count, eq } from "drizzle-orm";
// import { profiles } from "../users/schema";

import { DateTime } from "luxon";
import client from "~/supa-client";

// export const getTopics = async () => {
//   const allTopics = await db
//     .select({
//       name: topics.name,
//       slug: topics.slug,
//     })
//     .from(topics);
//   return allTopics;
// };

// export const getPosts = async () => {
//   const allPosts = await db
//     .select({
//       id: posts.post_id,
//       title: posts.title,
//       createdAt: posts.created_at,
//       author: profiles.name,
//       authorAvatarUrl: profiles.avatar,
//       username: profiles.username,
//       upvotes: count(postUpvotes.post_id),
//     })
//     .from(posts)
//     .innerJoin(topics, eq(posts.post_id, topics.topic_id)) //어떤 조건으로 조인할것인지
//     .innerJoin(profiles, eq(posts.profile_id, profiles.profile_id))
//     .leftJoin(postUpvotes, eq(posts.post_id, postUpvotes.post_id))
//     .groupBy(
//       posts.post_id,
//       profiles.name,
//       profiles.avatar,
//       profiles.username,
//       topics.name
//     ) //얼마나 많은 post upvotes인지 세고 싶음
//     .orderBy(asc(posts.post_id));
//   return allPosts;
// };

//superbase 관점에서
export const getTopics = async () => {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  const { data, error } = await client.from("topics").select("name, slug");
  if (error) throw new Error(error.message);
  return data;
};

// export const getPosts = async () => {
//   const { data, error } = await client.from("posts").select(`
//     post_id,
//     title,
//     created_at,
//     topic:topics!inner(
//       name
//     ),
//     author:profiles!inner(
//       name,
//       username,
//       avatar
//     ),
//     upvotes:post_upvotes(
//       count
//     )
//   `);
//   if (error) throw new Error(error.message);
//   return data;
// };

// view이기 때문에 : 필터링 + 재사용 등등..가능
export const getPosts = async ({
  limit,
  sorting,
  period = "all",
  keyword,
  topic,
}: {
  limit: number;
  sorting: "newest" | "popular";
  period?: string;
  keyword?: string;
  topic?: string;
}) => {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  const baseQuery = client
    .from("community_post_list_view")
    .select(`*`)
    .limit(limit);

  if (sorting === "newest") {
    baseQuery.order("created_at", { ascending: false });
  } else if (sorting === "popular") {
    const today = DateTime.now();
    if (period === "all") {
      baseQuery.order("upvotes", { ascending: false });
    } else {
      if (period === "today") {
        // filter...
        baseQuery.gte("created_at", today.startOf("day").toISO());
      } else if (period === "week") {
        baseQuery.gte("created_at", today.startOf("week").toISO());
      } else if (period === "month") {
        baseQuery.gte("created_at", today.startOf("month").toISO());
      } else if (period === "year") {
        baseQuery.gte("created_at", today.startOf("year").toISO());
      }
      baseQuery.order("upvotes", { ascending: false });
    }
  }

  if (keyword) {
    // %를 앞에만 붙이면 keyword로 끝나는
    // ilike가 SQL취약점을 보호
    baseQuery.ilike("title", `%${keyword}%`); // keyword를 검색하되, 문자의 위치는 상관없다
  }

  if (topic) {
    baseQuery.eq("topic_slug", topic); //equal
  }

  const { data, error } = await baseQuery;

  if (error) throw new Error(error.message);
  return data;
};

export const getPostById = async (postId: string) => {
  const { data, error } = await client
    .from("community_post_detail")
    .select("*")
    .eq("post_id", postId)
    .single();

  if (error) {
    throw error;
  }
  return data;
};

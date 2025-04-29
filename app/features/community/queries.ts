import db from "~/db";
import { topics, posts, postUpvotes } from "./schema";
import { asc, count, eq } from "drizzle-orm";
import { profiles } from "../users/schema";

export const getTopics = async () => {
  const allTopics = await db
    .select({
      name: topics.name,
      slug: topics.slug,
    })
    .from(topics);
  return allTopics;
};

export const getPosts = async () => {
  const allPosts = await db
    .select({
      id: posts.post_id,
      title: posts.title,
      createdAt: posts.created_at,
      author: profiles.name,
      authorAvatarUrl: profiles.avatar,
      username: profiles.username,
      upvotes: count(postUpvotes.post_id),
    })
    .from(posts)
    .innerJoin(topics, eq(posts.post_id, topics.topic_id)) //어떤 조건으로 조인할것인지
    .innerJoin(profiles, eq(posts.profile_id, profiles.profile_id))
    .leftJoin(postUpvotes, eq(posts.post_id, postUpvotes.post_id))
    .groupBy(
      posts.post_id,
      profiles.name,
      profiles.avatar,
      profiles.username,
      topics.name
    ) //얼마나 많은 post upvotes인지 세고 싶음
    .orderBy(asc(posts.post_id));
  return allPosts;
};

/**
 * DB 데이터를 수정, 변경하는 작업.
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "database.types";

export const createPost = async (
  client: SupabaseClient<Database>,
  {
    title,
    topic,
    content,
    userId,
  }: {
    title: string;
    topic: string;
    content: string;
    userId: string;
  }
) => {
  const { data: topicData, error: topicError } = await client
    .from("topics")
    .select("topic_id")
    .eq("slug", topic)
    .single();

  if (topicError) {
    throw topicError;
  }

  const { data, error } = await client
    .from("posts")
    .insert({
      title,
      content,
      profile_id: userId,
      topic_id: topicData.topic_id,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
};

export const updateUser = async (
  client: SupabaseClient<Database>,
  {
    id,
    name,
    role,
    headline,
    bio,
  }: {
    id: string;
    name: string;
    role: "developer" | "designer" | "marketer" | "product-manager";
    headline: string;
    bio: string;
  }
) => {
  const { data, error } = await client
    .from("profiles")
    .update({ name, role, headline, bio })
    .eq("profile_id", id);

  if (error) {
    throw error;
  }
};
export const updateUserAvatar = async (
  client: SupabaseClient<Database>,
  {
    id,
    avatarUrl,
  }: {
    id: string;
    avatarUrl: string;
  }
) => {
  const { error } = await client
    .from("profiles")
    .update({ avatar: avatarUrl })
    .eq("profile_id", id);
  if (error) {
    throw error;
  }
};

export const toggleUpvote = async (
  client: SupabaseClient<Database>,
  { postId, userId }: { postId: string; userId: string }
) => {
  const { count } = await client
    .from("post_upvotes")
    .select("*", { count: "exact", head: true })
    .eq("post_id", Number(postId))
    .eq("profile_id", userId);

  if (count === 0) {
    await client.from("post_upvotes").insert({
      post_id: Number(postId),
      profile_id: userId,
    });
  } else {
    await client
      .from("post_upvotes")
      .delete()
      .eq("post_id", Number(postId))
      .eq("profile_id", userId);
  }
};

export const seeNotification = async (
  client: SupabaseClient<Database>,
  { userId, notificationId }: { userId: string; notificationId: string }
) => {
  const { error } = await client
    .from("notifications")
    .update({ seen: true })
    .eq("notification_id", Number(notificationId))
    .eq("target_id", userId);
  if (error) {
    throw error;
  }
};

export const sendMessage = async (
  client: SupabaseClient<Database>,
  {
    fromUserId,
    toUserId,
    content,
  }: { fromUserId: string; toUserId: string; content: string }
) => {
  const { data, error } = await client
    .rpc("get_room", {
      from_user_id: fromUserId,
      to_user_id: toUserId,
    })
    .maybeSingle();
  if (error) {
    throw error;
  }
  if (data?.message_room_id) {
    await client.from("messages").insert({
      message_room_id: data.message_room_id,
      sender_id: fromUserId,
      content,
    });
    return data.message_room_id;
  } else {
    const { data: roomData, error: roomError } = await client
      .from("message_rooms")
      .insert({})
      .select("message_room_id")
      .single();
    if (roomError) {
      throw roomError;
    }
    await client.from("messages_room_members").insert([
      {
        message_room_id: roomData.message_room_id,
        profile_id: fromUserId,
      },
      {
        message_room_id: roomData.message_room_id,
        profile_id: toUserId,
      },
    ]);
    await client.from("messages").insert({
      message_room_id: roomData.message_room_id,
      sender_id: fromUserId,
      content,
    });
    return roomData.message_room_id;
  }
};

export const sendMessageToRoom = async (
  client: SupabaseClient<Database>,
  {
    userId,
    message,
    messageRoomId,
  }: {
    userId: string;
    message: string;
    messageRoomId: number;
  }
) => {
  await client.from("messages").insert({
    message_room_id: messageRoomId,
    sender_id: userId,
    content: message,
  });
};

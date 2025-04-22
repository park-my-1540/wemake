import { PostCard } from "~/features/community/components/post-card";
import type { Route } from "./+types/profile-posts-page";

export const meta: Route.MetaFunction = ({ params }) => [
  { title: `Posts - ${params.username}` },
];

export default function ProfilePostsPage() {
  return (
    <div className='flex flex-col gap-5'>
      {Array.from({ length: 10 }).map((_, index) => (
        <PostCard
          key={index}
          id='postId'
          title='What is the best way to learn React?'
          author='Sia'
          authorAvatarUrl='https://github.com/apple.png'
          category='productivity'
          postedAt='12 hours ago'
        />
      ))}
    </div>
  );
}

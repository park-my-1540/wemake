import type { Route } from "./+types/post-page";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export const meta: Route.MetaFunction = () => [
  { title: "게시글" },
  { name: "description", content: "게시글 상세 페이지입니다" },
];

export function loader({ request, params }: Route.LoaderArgs) {
  return {
    post: {
      id: params.postId,
      title: "게시글 제목",
      content: "게시글 내용입니다. 이곳에 실제 게시글 내용이 들어갑니다.",
      author: "작성자",
      createdAt: "2024-03-20",
    },
  };
}

export default function PostPage({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData;

  return (
    <div className='container mx-auto py-8'>
      <div className='mb-8'>
        <Button variant='outline' asChild className='mb-4'>
          <Link to='/auth/community'>목록으로</Link>
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>
              {post.author} • {post.createdAt}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='whitespace-pre-wrap'>{post.content}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

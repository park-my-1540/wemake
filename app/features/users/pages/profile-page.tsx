import { useOutletContext } from "react-router";
import type { Route } from "./+types/profile-page";
import client from "~/supa-client";

export const loader = async ({ params }: Route.LoaderArgs) => {
  // const user = await getUserPosts(params.username);
  try {
    const { error } = await client.rpc("track_event", {
      event_type: "profile_view",
      event_data: {
        username: params.username,
      },
    });

    if (error) {
      console.error("RPC 호출 에러:", error.message);
    } else {
      console.log("이벤트 기록 성공");
    }
  } catch (err) {
    console.error("예상치 못한 에러:", err);
  }

  return null;
};

export const meta: Route.MetaFunction = ({ params }) => [
  { title: `Profile: ${params.username}` },
];

export default function ProfilePage({}) {
  const { headline, bio } = useOutletContext<{
    headline: string;
    bio: string;
  }>();
  return (
    <div className='flex flex-col space-y-10 max-w-screen-md'>
      <div className='space-y-2'>
        <h4 className='text-lg font-bold'>Headline</h4>
        <p className='text-muted-foreground'>{headline}</p>
      </div>
      <div className='space-y-2'>
        <h4 className='text-lg font-bold'>About</h4>
        <p className='text-muted-foreground'>{bio}</p>
      </div>
    </div>
  );
}

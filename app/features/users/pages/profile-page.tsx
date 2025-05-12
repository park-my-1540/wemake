import { useOutletContext } from "react-router";
import type { Route } from "./+types/profile-page";

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
        <p>{headline}</p>
      </div>
      <div className='space-y-2'>
        <h4 className='text-lg font-bold'>About</h4>
        <p>{bio}</p>
      </div>
    </div>
  );
}

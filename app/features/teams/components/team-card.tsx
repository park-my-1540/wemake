import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

interface TeamCardProps {
  id: number;
  username: string;
  userAvatarUrl: string | null;
  roles: string[];
  productDescription: string;
}

export function TeamCard({
  id,
  username,
  userAvatarUrl,
  roles,
  productDescription,
}: TeamCardProps) {
  return (
    <Link to={`/teams/${id}`} className='block'>
      <Card className='bg-transparent hover:bg-card/50 flex flex-col justify-between transition-colors h-full'>
        <CardHeader className='flex flex-row items-center'>
          <CardTitle className='text-base leading-loose'>
            <Badge
              variant='secondary'
              className='inline-flex shadow-sm items-center m-1'
            >
              <span>@{username}</span>
              <Avatar className='size-5'>
                <AvatarFallback>N</AvatarFallback>
                {userAvatarUrl ? <AvatarImage src={userAvatarUrl} /> : null}
              </Avatar>
            </Badge>
            <span>님이 </span>
            <span>{productDescription}</span>
            <span>을 함께 만들</span>
            {roles.map((position, index) => (
              <Badge key={index} className='text-sm m-1'>
                {position}
              </Badge>
            ))}
            <span>를 모집중입니다.</span>
          </CardTitle>
        </CardHeader>
        <CardFooter className='flex justify-end'>
          <Button variant='link'>참여하기 &rarr;</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

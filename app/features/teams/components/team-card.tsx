import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

interface TeamCardProps {
  id: string;
  username: string;
  userAvatarUrl: string;
  positions: string[];
  projectDescription: string;
}

export function TeamCard({
  id,
  username,
  userAvatarUrl,
  positions,
  projectDescription,
}: TeamCardProps) {
  return (
    <Link to={`/teams/${id}`}>
      <Card className='bg-transparent hover:bg-card/50 transition-colors'>
        <CardHeader className='flex flex-row items-center'>
          <CardTitle className='text-base leading-loose'>
            <Badge
              variant='secondary'
              className='inline-flex shadow-sm items-center'
            >
              <span>@{username}</span>
              <Avatar className='size-5'>
                <AvatarFallback>N</AvatarFallback>
                <AvatarImage src={userAvatarUrl} />
              </Avatar>
            </Badge>
            <span>is looking for</span>
            {positions.map((position, index) => (
              <Badge key={index} className='text-base'>
                {position}
              </Badge>
            ))}
            <span>to build</span>
            <span>{projectDescription}</span>
          </CardTitle>
        </CardHeader>
        <CardFooter className='flex justify-end'>
          <Button variant='link'>Join team &rarr;</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

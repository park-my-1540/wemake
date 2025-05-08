import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { DateTime } from "luxon";

interface JobCardProps {
  id: number;
  companyName: string;
  companyLogoUrl: string;
  jobTitle: string;
  postedAt: string;
  jobType: string;
  locationType: string;
  salaryRange: string;
  location: string;
}

export function JobCard({
  id,
  companyName,
  companyLogoUrl,
  jobTitle,
  postedAt,
  jobType,
  locationType,
  salaryRange,
  location,
}: JobCardProps) {
  return (
    <Link to={`/jobs/${id}`}>
      <Card className='bg-transparent hover:bg-card/50 transition-colors'>
        <CardHeader>
          <div className='flex items-center gap-4 mb-4'>
            <img
              src={companyLogoUrl}
              alt={`${companyName} Logo`}
              className='size-10 rounded-full'
            />
            <div className='space-x-2'>
              <span className='text-accent-foreground'>{companyName}</span>
              <span className='text-xs text-muted-foreground'>
                {DateTime.fromISO(postedAt).toRelative()}
              </span>
            </div>
          </div>
          <CardTitle>
            <span className='text-accent-foreground'>{jobTitle}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant='outline'>{jobType}</Badge>
          <Badge variant='outline'>{locationType}</Badge>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <div className='flex flex-col'>
            <span className='text-sm font-medium text-muted-foreground'>
              {salaryRange}
            </span>
            <span className='text-sm font-medium text-muted-foreground'>
              {location}
            </span>
          </div>
          <Button variant='secondary' size='sm'>
            지원하기
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

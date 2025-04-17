import { Link } from "react-router";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ChevronRightIcon } from "lucide-react";

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
}

export function CategoryCard({ id, name, description }: CategoryCardProps) {
  return (
    <Link to='/products/categories/15321' className='block'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            {name}
            <ChevronRightIcon className='size-6' />
          </CardTitle>
          <CardDescription className='text-base'>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

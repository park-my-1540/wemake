import type { ReactNode } from "react";

interface HeroSectionProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export function HeroSection({
  title,
  description,
  children,
}: HeroSectionProps) {
  return (
    <div className='flex flex-col py-20 justify-center items-center rounded-md bg-gradient-to-t from-background to-primary/10'>
      <h1 className='text-3xl font-bold'>{title}</h1>
      {description && (
        <p className='text-2xl font-light text-foreground'>{description}</p>
      )}
      {children}
    </div>
  );
}

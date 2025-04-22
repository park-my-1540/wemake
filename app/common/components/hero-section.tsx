import type { ReactNode } from "react";

interface HeroSectionProps {
  title: string;
  subTitle?: string;
  children?: ReactNode;
}

export function HeroSection({ title, subTitle, children }: HeroSectionProps) {
  return (
    <div className='flex flex-col py-20 justify-center items-center rounded-md bg-gradient-to-t from-background to-primary/10'>
      <h1 className='text-3xl font-bold'>{title}</h1>
      {subTitle && (
        <p className='text-2xl font-light text-foreground'>{subTitle}</p>
      )}
      {children}
    </div>
  );
}

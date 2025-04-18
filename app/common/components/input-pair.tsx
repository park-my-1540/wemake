import type { InputHTMLAttributes } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
// InputPair가 input의 prop은 뭐든지 입력받을 수 있음.
export default function InputPair({
  label,
  description,
  textArea = false,
  ...rest
}: {
  label: string;
  description: string;
  textArea?: boolean;
} & InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>) {
  return (
    <div className='space-y-2 flex flex-col'>
      <Label htmlFor={rest.id} className='flex flex-col gap-1'>
        {label}
        <small className='text-muted-foreground'>{description}</small>
      </Label>
      {textArea ? (
        <Textarea rows={4} className='resize-none' {...rest} />
      ) : (
        <Input {...rest} />
      )}
    </div>
  );
}

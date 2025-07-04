import { useState } from "react";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
export default function SelectPair({
  name,
  required,
  label,
  description,
  placeholder,
  options,
  defaultValue,
}: {
  label: string;
  description?: string;
  name: string;
  required?: boolean;
  placeholder: string;
  defaultValue?: string;
  options: {
    label: string;
    value: string;
  }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className='space-y-2 flex flex-col'>
      <Label className='flex flex-col gap-1' onClick={() => setOpen(!open)}>
        {label}
        <small className='text-muted-foreground'>{description}</small>
      </Label>
      <Select
        name={name}
        required={required}
        open={open}
        onOpenChange={setOpen}
        defaultValue={defaultValue}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

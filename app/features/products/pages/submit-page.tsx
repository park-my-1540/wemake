import { HeroSection } from "~/common/components/hero-section";
import type { Route } from "./+types/submit-page";
import { Form } from "react-router";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import InputPair from "~/common/components/input-pair";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import SelectPair from "~/common/components/select-pair";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Product | WeMake" },
    { name: "description", content: "Submit your product to WeMake" },
  ];
};

export default function SubmitPage({ actionData }: Route.ComponentProps) {
  return (
    <div>
      <HeroSection
        title='Submit Your Product'
        subtitle='Share your product with the world'
      />
      <Form className='grid grid-cols-2 gap-10 max-w-screen-lg mx-auto'>
        <div className='space-y-5'>
          <InputPair
            label='name'
            description='This is the name of your product'
            name='name'
            type='text'
            id='name'
            required
            placeholder='Name of your product'
          />
          <InputPair
            label='Product Name'
            description='60 characters or less'
            name='tagline'
            type='text'
            id='tagline'
            required
            placeholder='A concise description of your product'
          />
          <InputPair
            label='URL'
            description='The URL of your product'
            name='url'
            type='text'
            id='url'
            required
            placeholder='https://example.com'
          />
          <InputPair
            textArea
            label='Description'
            description='A detailed description of your product'
            name='description'
            type='text'
            id='description'
            required
            placeholder='A detailed description of your product'
          />
          <SelectPair
            label='Category'
            description='Select the category of your product'
            name='category'
            required
            placeholder='Select the category of your product'
            options={[
              { label: "Category 1", value: "category1" },
              { label: "Category 2", value: "category2" },
              { label: "Category 3", value: "category3" },
            ]}
          />
        </div>
      </Form>
    </div>
  );
}

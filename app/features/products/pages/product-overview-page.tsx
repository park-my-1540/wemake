import { useOutletContext } from "react-router";
import client from "~/supa-client";
import type { Route } from "./+types/product-overview-page";

export const loader = async ({ params }: Route.LoaderArgs) => {
  await client.rpc("track_event", {
    event_type: "product_view",
    event_data: {
      product_id: params.productId,
    },
  });
  return null;
};

export default function ProductOverviewPage() {
  const { description, how_it_works } = useOutletContext<{
    description: string;
    how_it_works: string;
  }>();

  return (
    <div className='space-y-10'>
      <div className='space-y-2'>
        <h3 className='text-2xl font-bold'>이 제품은 무엇인가요?</h3>
        <p className='text-muted-foreground'>{description}</p>
      </div>
      <div className='space-y-2'>
        <h3 className='text-2xl font-bold'>어떻게 작동하나요?</h3>
        <p className='text-muted-foreground'>{how_it_works}</p>
      </div>
    </div>
  );
}

import { Outlet } from "react-router";
import { FlickeringGrid } from "~/common/components/flickering-grid";
export default function AuthLayout() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 h-screen'>
      <FlickeringGrid squareSize={4} gridGap={5} flickerChance={0.2} />
      <Outlet />
    </div>
  );
}

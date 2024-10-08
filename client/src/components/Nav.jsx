import { Outlet } from "react-router-dom";
import Header from "./Header";
export default function Nav() {
  return (
    <div className="flex flex-grow flex-col min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
}

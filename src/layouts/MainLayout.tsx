import { Outlet } from "react-router-dom";
import Header from "../components/headers/MainHeader";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="p-6">
        <Outlet />
      </main>
    </>
  );
}

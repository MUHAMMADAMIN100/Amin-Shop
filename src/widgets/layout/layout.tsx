import { Outlet } from "react-router-dom";
import Header from "../header/ui/header";
import Footer from "../footer/ui/footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../entities/category/thunks";
import type { AppDispatch } from "../../app/store/store";
import CatalogModal from "../catalogModal/catalogModal";

export default function Layout() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="mx-auto px-4 py-6 max-w-7xl">
          <CatalogModal/>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

import HeroBanner from "../../widgets/Banner/heroBanner";
import ProductList from "../products/products";

export default function HomePage() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <main className="mx-auto px-4 max-w-7xl">
                <HeroBanner />
                <h2 className="mt-12 mb-4 font-bold text-2xl">Популярные товары</h2>
                <ProductList />
            </main>
        </div>
    );
}

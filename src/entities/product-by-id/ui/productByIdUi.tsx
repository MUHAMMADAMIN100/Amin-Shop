import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../app/store/store";
import { fetchProductById } from "../thunks";
import { clearProductById } from "../productByIdSlice";
import { Button, Spin, Rate } from "antd";
import { addToCart } from "../../cart/thunks";
import { getProductImage } from "../../../shared/lib/getProductImage";

export default function ProductByIdUi() {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const { product, loading } = useSelector(
        (state: RootState) => state.productById
    );

    const [activeImage, setActiveImage] = useState<string | null>(null);

    useEffect(() => {
        if (id) dispatch(fetchProductById(+id));
        return () => {
            dispatch(clearProductById());
        };
    }, [id, dispatch]);

    // Устанавливаем первую картинку как активную
    useEffect(() => {
        if (product?.images?.length) {
            setActiveImage(product.images[0].images);
        }
    }, [product]);

    if (loading)
        return (
            <div className="flex justify-center mt-20">
                <Spin size="large" />
            </div>
        );

    if (!product) return <h3>Товар не найден</h3>;

    return (
        <div className="mx-auto px-4 py-6 max-w-6xl">
            <div className="gap-10 grid grid-cols-1 md:grid-cols-2">

                {/* LEFT — GALLERY */}
                <div className="flex gap-4">
                    {/* thumbnails */}
                    <div className="flex flex-col gap-2">
                        {product.images.map(img => (
                            <img
                                key={img.id}
                                src={getProductImage(img.images)}
                                onClick={() => setActiveImage(img.images)}
                                className={`w-16 h-16 object-contain cursor-pointer rounded border
                                  ${activeImage === img.images
                                        ? "border-blue-500"
                                        : "border-gray-300"
                                    }`}
                            />
                        ))}
                    </div>

                    {/* main image */}
                    <div className="flex-1 p-4 border rounded-xl">
                        <img
                            src={getProductImage(activeImage || "")}
                            alt={product.productName}
                            className="w-full h-[380px] object-contain"
                        />
                    </div>
                </div>

                {/* RIGHT — INFO */}
                <div className="flex flex-col gap-4">
                    <h1 className="font-semibold text-2xl">
                        {product.productName}
                    </h1>

                    <div className="text-gray-500">
                        Бренд: <span className="font-medium">{product.brand}</span>
                    </div>

                    <div className="text-gray-500">
                        Код товара: <span className="font-medium">{product.code}</span>
                    </div>

                    {/* PRICE */}
                    {product.hasDiscount ? (
                        <div className="flex items-center gap-3">
                            <span className="font-bold text-red-600 text-3xl">
                                {product.discountPrice} c
                            </span>
                            <span className="text-gray-400 line-through">
                                {product.price} c
                            </span>
                        </div>
                    ) : (
                        <div className="font-bold text-3xl">
                            {product.price} c
                        </div>
                    )}

                    {/* INSTALLMENT */}
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <div className="text-gray-500 text-sm">В рассрочку</div>
                        <div
                            className="font-semibold text-xl"
                            style={{ color: "rgb(30, 118, 178)" }}
                        >
                            {Math.floor(product.price / 6)} c × 6 мес
                        </div>
                    </div>

                    {/* COLOR */}
                    <div className="flex items-center gap-2">
                        <span>Цвет:</span>
                        <span
                            className="border rounded-full w-5 h-5"
                            style={{ backgroundColor: product.color }}
                        />
                    </div>

                    {/* DESCRIPTION */}
                    <div>
                        <h3 className="mb-1 font-medium">Описание</h3>
                        <p className="text-gray-600">{product.description}</p>
                    </div>

                    {/* STOCK */}
                    <div className="text-gray-500 text-sm">
                        В наличии: {product.quantity} шт
                    </div>

                    {/* ADD TO CART */}
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => dispatch(addToCart(product.id))}
                        style={{ backgroundColor: "rgb(30, 118, 178)" }}
                    >
                        Добавить в корзину
                    </Button>
                </div>
            </div>
        </div>
    );
}

import { Card, Button } from "antd";
import { ShoppingCartOutlined, InfoCircleOutlined } from "@ant-design/icons";
import type { Product } from "../model/types";
import { getProductImage } from "../../../shared/lib/getProductImage";

interface Props {
  product: Product;
  onAddToCart: (id: number) => void;
  onDetails: (id: number) => void;
}

export default function ProductCard({ product, onAddToCart, onDetails }: Props) {
  const discountPercent = product.hasDiscount
    ? Math.round(100 - (product.discountPrice / product.price) * 100)
    : 0;

  return (
    <Card
      className="relative shadow-md hover:shadow-lg rounded-xl overflow-hidden transition-all duration-200"
      cover={
        <img
          src={getProductImage(product.image)}
          alt={product.productName}
          className="w-full h-[280px] object-cover"
        />
      }
    >
      {/* Скидка */}
      {product.hasDiscount && (
        <div className="top-2 left-2 absolute bg-red-500 px-2 py-1 rounded text-white text-xs">
          -{discountPercent}%
        </div>
      )}

      {/* Информация о продукте */}
      <div className="mt-2 mb-4">
        <h3 className="font-medium text-gray-900 text-lg">{product.productName}</h3>
        <p className="text-gray-500 text-sm">{product.categoryName}</p>
        <div className="flex items-center gap-2 mt-1">
          {product.hasDiscount ? (
            <>
              <span className="font-semibold text-green-500">{product.discountPrice} $</span>
              <span className="text-gray-400 line-through">{product.price} $</span>
            </>
          ) : (
            <span className="font-semibold text-gray-900">{product.price} $</span>
          )}
        </div>
      </div>

      {/* Кнопки */}
      <div className="flex gap-2">
        <Button
          type="primary"
          block
          icon={<ShoppingCartOutlined />}
          className="hover:bg-green-500 border-lightblue h-10 -400"
          style={{backgroundColor: "rgb(30, 118, 178)"}}
          onClick={() => onAddToCart(product.id)}
        >
          В корзину
        </Button>
        <Button
          block
          icon={<InfoCircleOutlined />}
          className="hover:bg-gray-100 border-gray-300 h-10"
          onClick={() => onDetails(product.id)}
        >
          Подробнее
        </Button>
      </div>
    </Card>
  );
}

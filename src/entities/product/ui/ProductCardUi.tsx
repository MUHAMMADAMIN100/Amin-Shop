import { Card, Button } from "antd";
import { ShoppingCartOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Image } from "antd";
import type { Product } from "../model/types";
import { getProductImage } from "../../../shared/lib/getProductImage";

interface Props {
  product: Product;
  onAddToCart: (id: number) => void;
  onDetails: (id: number) => void;
}

export default function ProductCard({ product, onAddToCart, onDetails }: Props) {
  const discountPercent = product.hasDiscount
    ? Math.round((1 - product.discountPrice / product.price) * 100)
    : 0;

  return (
    <Card
      hoverable
      className="shadow-md rounded-xl"
      bodyStyle={{ padding: "16px" }}
      cover={
        <div className="relative">
          {product.hasDiscount && (
            <div className="top-2 left-2 absolute bg-red-600 px-2 py-1 rounded font-bold text-white text-xs">
              -{discountPercent}%
            </div>
          )}
          <Image
            src={getProductImage(product.image)}
            alt={product.productName}
            height={200}
            className="object-contain"
            preview={false}
          />
        </div>
      }
    >
      <div className="flex flex-col gap-1">
        <h3 className="font-medium text-gray-800">{product.productName}</h3>
        <div className="text-gray-500 text-sm">{product.categoryName}</div>
        <div className="text-gray-500 text-sm">{product.color}</div>

        <div className="flex items-center gap-2 mt-2">
          {product.hasDiscount ? (
            <>
              <span className="font-bold text-lg">{product.discountPrice} $</span>
              <span className="text-gray-400 text-sm line-through">{product.price} $</span>
            </>
          ) : (
            <span className="font-bold text-lg">{product.price} $</span>
          )}
        </div>

        <div className="flex gap-2 mt-3">
          <Button
            type="primary"
            className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black"
            icon={<ShoppingCartOutlined />}
            onClick={() => onAddToCart(product.id)}
          >
            В корзину
          </Button>
          <Button
            className="flex-1"
            icon={<InfoCircleOutlined />}
            onClick={() => onDetails(product.id)}
          >
            Подробнее
          </Button>
        </div>
      </div>
    </Card>
  );
}

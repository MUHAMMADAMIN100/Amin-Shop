import { Input, Badge, Button } from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
  SearchOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../../app/store/store";
import { openCatalog } from "../../../entities/catalog/catalogSlice";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(
    (state: RootState) => state.cart.products || []
  );

  const totalCount = products.reduce(
    (acc, item) => acc + (item.quantity || 0),
    0
  );

  return (
    <header className="top-0 z-50 sticky bg-white border-b">
      <div className="mx-auto px-4 max-w-7xl">
        <div className="flex items-center gap-6 h-16">
          {/* Logo */}
          <div
            className="font-bold text-2xl whitespace-nowrap cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="text-blue-600">Smart</span>
            <span className="text-black">Store</span>
          </div>

          {/* Catalog button */}
          <Button
            type="primary"
            icon={<MenuOutlined />}
            onClick={() => dispatch(openCatalog())}
            className="bg-yellow-400 px-4 py-2 rounded-lg font-semibold"
          >
            Каталог
          </Button>

          {/* Search */}
          <div className="hidden md:block flex-1">
            <Input
              size="large"
              placeholder="Поиск товаров"
              prefix={<SearchOutlined className="text-gray-400" />}
              className="rounded-lg"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Badge count={0} offset={[0, 2]}>
              <HeartOutlined className="hover:text-blue-600 text-xl cursor-pointer" />
            </Badge>

            <Badge count={totalCount} offset={[0, 2]}>
              <ShoppingCartOutlined
                className="hover:text-blue-600 text-xl cursor-pointer"
                onClick={() => navigate("/cart")}
              />
            </Badge>

            <UserOutlined
              className="hover:text-blue-600 text-xl cursor-pointer"
              onClick={() => navigate("/users")}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

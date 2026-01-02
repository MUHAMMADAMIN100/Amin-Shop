import { Input, Badge, Button, Image } from "antd";
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
import img from "../../../shared/ui/images/image_1_1767204065379.jpg";

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
          <Image
            src={img}
            style={{
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <div
            className="font-bold text-2xl whitespace-nowrap cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span style={{ color: "rgb(30, 118, 178)" }}>amin </span>
            <span className="text-black">store</span>
          </div>

          {/* Catalog button */}
          <Button
            type="primary"
            icon={<MenuOutlined />}
            onClick={() => dispatch(openCatalog())}
            className="px-4 py-2 rounded-lg font-semibold"
            style={{ backgroundColor: "rgb(30, 118, 178)" }}
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

            {/* Login icon */}
            <UserOutlined
              className="hover:text-blue-600 text-xl cursor-pointer"
              onClick={() => navigate("/login")}
              title="Вход"
            />

            {/* Registration icon */}
            <Button
              size="small"
              type="default"
              className="p-0 text-blue-600 hover:underline"
              onClick={() => navigate("/registration")}
            >
              Регистрация
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
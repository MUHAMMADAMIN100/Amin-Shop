import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../app/store/store";
import { fetchProducts } from "../../entities/product/thunks";
import ProductCard from "../../entities/product/ui/ProductCardUi";
import { Row, Col, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../entities/cart/thunks";
import CategoryListUi from "../../entities/category/ui/categoryUi";

export default function ProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { products, loading, selectedCategoryId, selectedSubCategoryId } =
    useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(
      fetchProducts({
        categoryId: selectedCategoryId,
        subCategoryId: selectedSubCategoryId,
      })
    );
  }, [dispatch, selectedCategoryId, selectedSubCategoryId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="flex gap-6 mx-auto mt-6 px-4 max-w-7xl">
   

      {/* Product Grid */}
      <section className="flex-1">
        <Row gutter={[16, 16]}>
          {products.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
              <ProductCard
                product={product}
                onAddToCart={(id) => dispatch(addToCart(id))}
                onDetails={(id) => navigate(`/products/${id}`)}
              />
            </Col>
          ))}
        </Row>
      </section>
    </div>
  );
}

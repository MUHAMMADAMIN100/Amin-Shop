import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../thunks";
import { setCategoryFilter, setSubCategoryFilter } from "../../product/productSlice";
import type { AppDispatch, RootState } from "../../../app/store/store";

export default function CategoryListUi() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading } = useSelector((state: RootState) => state.category);
  const { selectedCategoryId, selectedSubCategoryId } = useSelector((state: RootState) => state.products);

  const [hoveredCategoryId, setHoveredCategoryId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const selectCategory = (id: number | null) => {
    dispatch(setCategoryFilter(id));
    dispatch(setSubCategoryFilter(null));
  };

  const selectSubCategory = (id: number) => {
    dispatch(setSubCategoryFilter(id));
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="relative w-[200px]">
      <ul>
        <li
          className={`px-4 py-2 cursor-pointer ${selectedCategoryId === null ? "font-bold bg-gray-100" : ""}`}
          onClick={() => selectCategory(null)}
        >
          Все товары
        </li>

        {categories.map(cat => (
          <li
            key={cat.id}
            className="group relative"
            onMouseEnter={() => setHoveredCategoryId(cat.id)}
            onMouseLeave={() => setHoveredCategoryId(null)}
          >
            <div
              className={`px-4 py-2 cursor-pointer flex justify-between items-center
              ${selectedCategoryId === cat.id ? "font-bold bg-gray-100" : "hover:bg-gray-100"}`}
              onClick={() => selectCategory(cat.id)}
            >
              {cat.categoryName}
              {cat.subCategories.length > 0 && <span>&gt;</span>}
            </div>

            {cat.subCategories.length > 0 && hoveredCategoryId === cat.id && (
              <div className="top-0 left-full z-50 absolute bg-white shadow-lg border w-[200px] max-h-80 overflow-scroll">
                {cat.subCategories.map(sub => (
                  <div
                    key={sub.id}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100
                      ${selectedSubCategoryId === sub.id ? "font-bold bg-gray-200" : ""}`}
                    onClick={() => selectSubCategory(sub.id)}
                  >
                    {sub.subCategoryName}
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

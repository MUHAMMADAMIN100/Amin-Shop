import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../app/store/store";
import {
  setCategoryFilter,
  setSubCategoryFilter,
} from "../../product/productSlice";

export default function SubCategoryUi() {
  const dispatch = useDispatch<AppDispatch>();

  const { categories } = useSelector(
    (state: RootState) => state.category
  );

  const { selectedCategoryId, selectedSubCategoryId } = useSelector(
    (state: RootState) => state.products
  );

  const selectedCategory = categories.find(
    (c) => c.id === selectedCategoryId
  );

  const selectCategory = (id: number) => {
    dispatch(setCategoryFilter(id));
    dispatch(setSubCategoryFilter(null)); 
  };

  const selectSub = (id: number) => {
    dispatch(setSubCategoryFilter(id));
  };

  return (
    <>
      <h3>Категории</h3>

      {categories.map((c) => (
        <div
          key={c.id}
          onClick={() => selectCategory(c.id)}
          style={{
            cursor: "pointer",
            fontWeight:
              selectedCategoryId === c.id ? "bold" : "normal",
          }}
        >
          {c.categoryName}
        </div>
      ))}

      {selectedCategory && selectedCategory.subCategories.length > 0 && (
        <>
          <h4>Подкатегории</h4>

          {selectedCategory.subCategories.map((s) => (
            <div
              key={s.id}
              onClick={() => selectSub(s.id)}
              style={{
                cursor: "pointer",
                paddingLeft: 16,
                fontWeight:
                  selectedSubCategoryId === s.id ? "bold" : "normal",
              }}
            >
              {s.subCategoryName}
            </div>
          ))}
        </>
      )}
    </>
  );
}

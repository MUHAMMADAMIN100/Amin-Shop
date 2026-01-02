import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store/store";
import { closeCatalog, setHoveredCategoryId } from "../../entities/catalog/catalogSlice";
import { useNavigate } from "react-router-dom";
import { setCategoryFilter, setSubCategoryFilter } from "../../entities/product/productSlice";
import { getCategoryImage } from "../../shared/lib/getCategoryImage";

export default function CatalogModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isOpen, hoveredCategoryId } = useSelector(
    (s: RootState) => s.catalogUi
  );
  const { categories } = useSelector((s: RootState) => s.category);

  if (!isOpen) return null;

  const activeCategory = categories.find(c => c.id === hoveredCategoryId);

  return (
    <div className="z-50 fixed inset-0 bg-black/40">
      <div className="flex bg-white mx-auto mt-24 rounded-xl w-[1200px]">

        {/* LEFT */}
        <div className="border-r w-[300px] max-h-[600px] overflow-y-auto">
          {categories.map(cat => (
            <div
              key={cat.id}
              onMouseEnter={() => dispatch(setHoveredCategoryId(cat.id))}
              className="flex justify-between hover:bg-gray-100 px-6 py-4 cursor-pointer"
            >
              <img
                src={getCategoryImage(cat.categoryImage)}
                alt={cat.categoryName}
                className="w-6 h-6 object-contain"
              />
              {cat.categoryName}
              <span>›</span>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="flex-1 p-8">
          {activeCategory && (
            <>
              <h2 className="mb-6 font-bold text-2xl">
                {activeCategory.categoryName}
              </h2>

              <div className="gap-6 grid grid-cols-3">
                {activeCategory.subCategories.map(sub => (
                  <div
                    key={sub.id}
                    className="font-medium hover:text-yellow-500 cursor-pointer"
                    onClick={() => {
                      dispatch(setCategoryFilter(activeCategory.id));
                      dispatch(setSubCategoryFilter(sub.id));
                      dispatch(closeCatalog());
                      navigate("/products");
                    }}
                  >
                    {sub.subCategoryName}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* CLOSE */}
        <button
          onClick={() => dispatch(closeCatalog())}
          className="top-4 right-6 absolute text-xl"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

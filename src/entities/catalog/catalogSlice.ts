import { createSlice } from "@reduxjs/toolkit";
import type { CatalogUiState } from "./model/types";

const initialState: CatalogUiState = {
    isOpen: false,
    hoveredCategoryId: null,
}

const catalogUiSlice = createSlice({
    name: "catalogUi",
    initialState,
    reducers: {
        openCatalog(state) {
            state.isOpen = true;
        },
        closeCatalog(state) {
            state.isOpen = false;
        },
        setHoveredCategoryId(state, action) {
            state.hoveredCategoryId = action.payload;
        }
    }
});

export default catalogUiSlice.reducer;
export const { openCatalog, closeCatalog, setHoveredCategoryId } = catalogUiSlice.actions;
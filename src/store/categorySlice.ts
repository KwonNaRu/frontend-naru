import { CategoryProps } from "@/types/post";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./index";

const initialState = {
    categoryList: [] as CategoryProps[],
}

const categorySlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setCategoryList: (
            state,
            action: PayloadAction<CategoryProps[]>
        ) => {
            state.categoryList = action.payload
        },
    },
})

export const computedCategoryListWithoutPosts = (state: RootState) =>
    state.category.categoryList.map((category) => { return { id: category.id, name: category.name } });

export const { setCategoryList } = categorySlice.actions

export default categorySlice.reducer

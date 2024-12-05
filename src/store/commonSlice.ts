import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
}

const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        setIsLoading: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.isLoading = action.payload
        },
    },
})

export const { setIsLoading } = commonSlice.actions

export default commonSlice.reducer

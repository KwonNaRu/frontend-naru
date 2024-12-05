import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    alert: {
        message: "",
        type: "error",
        show: false,
    },
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
        showAlert: (state, action: PayloadAction<{ message: string; type: "error" | "success" | "warning" | "info"; show: boolean }>) => {
            state.alert = action.payload;
        },
        hideAlert: (state) => {
            state.alert = initialState.alert;
        },
    },
})

export const { setIsLoading, showAlert, hideAlert } = commonSlice.actions

export default commonSlice.reducer

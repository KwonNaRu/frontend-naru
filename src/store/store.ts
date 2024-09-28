import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth/authSlice" // auth slice import

// Redux 스토어 생성
const store = configureStore({
  reducer: {
    auth: authReducer, // auth 상태 관리 리듀서 추가
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

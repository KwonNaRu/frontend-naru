import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// 로그인, 회원가입 상태의 초기값 정의
interface AuthState {
  isAuthenticated: boolean
  user: { username: string; email: string } | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
}

// 로그인/회원가입 상태를 관리하는 slice 생성
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ username: string; email: string }>
    ) => {
      state.isAuthenticated = true // 사용자가 로그인했음을 표시
      state.user = action.payload // 사용자 정보 저장
    },
    logout: (state) => {
      state.isAuthenticated = false // 로그아웃 처리
      state.user = null // 사용자 정보 초기화
    },
  },
})

// action을 내보내서 나중에 로그인/로그아웃 처리 시 사용
export const { login, logout } = authSlice.actions

// reducer 내보내기
export default authSlice.reducer

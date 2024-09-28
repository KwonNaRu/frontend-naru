import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import SignUp from "./pages/auth/SignUp" // 회원가입 페이지 컴포넌트
import Login from "./pages/auth/Login" // 로그인 페이지 컴포넌트
import LandingPage from "./pages/LandingPage"
import "./App.scss"

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* 랜딩 페이지 */}
        {/* 회원가입 페이지 라우트 */}
        <Route path="/signup" element={<SignUp />} />
        {/* 로그인 페이지 라우트 */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App

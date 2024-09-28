import * as yup from "yup" // yup을 사용하여 유효성 검사 규칙을 정의

// 회원가입 폼 유효성 검사 스키마
export const signupSchema = yup.object().shape({
  username: yup.string().required("Username is required"), // 필수 입력 항목
  email: yup.string().email("Invalid email").required("Email is required"), // 이메일 형식 검사
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"), // 비밀번호 최소 길이 6자
})

// 로그인 폼 유효성 검사 스키마
export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"), // 이메일 형식 검사
  password: yup.string().required("Password is required"), // 비밀번호 필수 입력 항목
})

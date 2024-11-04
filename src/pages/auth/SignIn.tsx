import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validationSchemas"; // 로그인용 유효성 검사 스키마
import axios from "../../configs/axiosConfig"; // 설정한 Axios 인스턴스 임포트
import { useDispatch } from "react-redux";
import { login } from "../../store/auth/authSlice"; // login action 가져오기
import "../../styles/SignIn.scss";

// 로그인 폼에 입력될 데이터의 타입 정의
interface LoginFormInputs {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    // react-hook-form을 사용하여 폼 상태 관리
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: yupResolver(loginSchema), // yup 스키마로 유효성 검사
    });

    const dispatch = useDispatch(); // Redux dispatch 함수

    // 폼 제출 시 실행될 함수
    const onSubmit = async (data: LoginFormInputs) => {
        try {
            // 서버에 로그인 정보 전송
            const response = await axios.post("/auth/login", data);
            console.log(response.data); // 서버 응답 로그

            // 로그인 성공 시 Redux 상태 업데이트
            dispatch(login({ username: "User", email: data.email }));
        } catch (error) {
            console.error(error); // 에러 발생 시 로그
        }
    };

    return (
        <div className="signin sign-form-container">
            <form className="sign-form" onSubmit={handleSubmit(onSubmit)}>
                <h2>Login</h2>

                {/* 이메일 입력 필드 */}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" {...register("email")} className={`input ${errors.email ? "input-error" : ""}`} placeholder="Enter your email" />
                    {errors.email && <p className="error-message">{errors.email.message}</p>}
                </div>

                {/* 비밀번호 입력 필드 */}
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" {...register("password")} className={`input ${errors.password ? "input-error" : ""}`} placeholder="Enter your password" />
                    {errors.password && <p className="error-message">{errors.password.message}</p>}
                </div>

                {/* 제출 버튼 */}
                <button type="submit" className="btn-submit">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;

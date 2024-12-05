// components/SignUpForm.tsx
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/validationSchemas"; // 로그인용 유효성 검사 스키마
import { useAppDispatch } from "@/store/hooks";
import { signIn } from "@/store/authSlice"; // login action 가져오기
import styles from "./signin.module.scss";
import Alert from "@/components/Alert/Alert";
import { useRouter } from "next/navigation";
import axiosInstance from "@/configs/axiosConfig";
import { setIsLoading } from "@/store/commonSlice";

// 로그인 폼에 입력될 데이터의 타입 정의
interface LoginFormInputs {
    email: string;
    password: string;
}

const SignInForm: React.FC = () => {
    // react-hook-form을 사용하여 폼 상태 관리
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: yupResolver(loginSchema), // yup 스키마로 유효성 검사
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [showError, setShowError] = useState(false);

    const dispatch = useAppDispatch(); // Redux dispatch 함수
    const router = useRouter();

    // 폼 제출 시 실행될 함수
    const onSubmit = async (loginData: LoginFormInputs) => {
        try {
            dispatch(setIsLoading(true));
            // 서버에 로그인 정보 전송
            const { data } = await axiosInstance.post("/auth/login", loginData);

            // 로그인 성공 시 Redux 상태 업데이트
            dispatch(signIn(data));
            router.push("/");
        } catch (error) {
            console.error(error); // 에러 발생 시 로그
            setErrorMessage("로그인에 실패했습니다. 다시 시도해 주세요.");
            setShowError(true);
        }
    };

    return (
        <>
            {showError && errorMessage && <Alert message={errorMessage} type="error" onClose={() => setShowError(false)} />}
            <form className={styles["sign-form"]} onSubmit={handleSubmit(onSubmit)}>
                <h2>Login</h2>

                {/* 이메일 입력 필드 */}
                <div className={styles["form-group"]}>
                    <label htmlFor="email">Email</label>
                    <input id="email" {...register("email")} className={`${styles.input} ${errors.email ? `${styles["input-error"]}` : ""}`} placeholder="Enter your email" />
                    {errors.email && <p className={styles["error-message"]}>{errors.email.message}</p>}
                </div>

                {/* 비밀번호 입력 필드 */}
                <div className={styles["form-group"]}>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" {...register("password")} className={`${styles.input} ${errors.password ? `${styles["input-error"]}` : ""}`} placeholder="Enter your password" />
                    {errors.password && <p className={styles["error-message"]}>{errors.password.message}</p>}
                </div>

                {/* 제출 버튼 */}
                <button type="submit" className={styles["btn-submit"]}>
                    Login
                </button>
            </form>
        </>
    );
};

export default SignInForm;

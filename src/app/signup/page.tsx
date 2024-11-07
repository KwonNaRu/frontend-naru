"use client";

import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form"; // react-hook-form을 사용하여 폼 데이터를 쉽게 관리
import { yupResolver } from "@hookform/resolvers/yup"; // react-hook-form과 yup을 연결
import { signupSchema } from "../../validationSchemas"; // yup으로 만든 유효성 검사 스키마
import axios from "../../configs/axiosConfig"; // 서버와의 HTTP 요청을 위한 라이브러리
import { useDispatch } from "react-redux";
import { login } from "../../store/auth/authSlice"; // login action 가져오기
import styles from "./signup.module.scss";
import Alert from "../../components/Alert";

// 회원가입 폼에 입력될 데이터의 타입 정의
interface SignUpFormInputs {
    username: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    // react-hook-form을 사용하여 폼 상태 관리
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormInputs>({
        resolver: yupResolver(signupSchema), // yup 스키마로 유효성 검사
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [showError, setShowError] = useState(false);

    const dispatch = useDispatch(); // Redux dispatch 함수

    // 폼 제출 시 실행될 함수
    const onSubmit = useCallback(
        async (data: SignUpFormInputs) => {
            try {
                setErrorMessage(""); // 이전 에러 메시지 초기화
                setShowError(false);

                // 서버에 회원가입 정보 전송
                const response = await axios.post("/auth/register", data);
                console.log(response.data); // 서버 응답 로그

                // 회원가입 성공 시 Redux 상태 업데이트
                dispatch(login({ username: data.username, email: data.email }));
            } catch (error) {
                setErrorMessage("회원가입에 실패했습니다. 다시 시도해 주세요.");
                setShowError(true);
                console.error(error); // 에러 발생 시 로그
            }
        },
        [dispatch]
    );

    return (
        <div className={`${styles.signup} ${styles["sign-form-container"]}`}>
            {showError && errorMessage && <Alert message={errorMessage} type="error" onClose={() => setShowError(false)} />}
            <form className={styles["sign-form"]} onSubmit={handleSubmit(onSubmit)}>
                <h2>Sign Up</h2>

                {/* 사용자 이름 입력 필드 */}
                <div className={styles["form-group"]}>
                    <label htmlFor="username">Username</label>
                    <input id="username" {...register("username")} className={`${styles.input} ${errors.username ? `${styles["input-error"]}` : ""}`} placeholder="Enter your username" />
                    {errors.username && <p className={styles["error-message"]}>{errors.username.message}</p>}
                </div>

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
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;

// components/SignUpForm.tsx
"use client";

import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "@/validationSchemas";
import axios from "@/configs/axiosConfig";
import { useDispatch } from "react-redux";
import { login } from "@/store/auth/authSlice";
import styles from "./signup.module.scss";
import Alert from "@/components/Alert";

interface SignUpFormInputs {
    username: string;
    email: string;
    password: string;
}

const SignUpForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormInputs>({
        resolver: yupResolver(signupSchema),
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [showError, setShowError] = useState(false);
    const dispatch = useDispatch();

    const onSubmit = useCallback(
        async (data: SignUpFormInputs) => {
            try {
                setErrorMessage("");
                setShowError(false);
                const response = await axios.post("/auth/register", data);
                console.log(response.data); // 서버 응답 로그
                dispatch(login({ username: data.username, email: data.email }));
            } catch (error) {
                setErrorMessage("회원가입에 실패했습니다. 다시 시도해 주세요.");
                setShowError(true);
                console.error(error);
            }
        },
        [dispatch]
    );

    return (
        <>
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
        </>
    );
};

export default SignUpForm;
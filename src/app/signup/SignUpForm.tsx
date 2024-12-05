// components/SignUpForm.tsx
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "@/validationSchemas";
import axios from "@/configs/axiosConfig";
import styles from "./signup.module.scss";
import { useRouter } from "next/navigation";
import { hideAlert, setIsLoading, showAlert } from "@/store/commonSlice";
import { useAppDispatch } from "@/store/hooks";

interface SignUpFormInputs {
    username: string;
    email: string;
    password: string;
}

const SignUpForm: React.FC = () => {
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormInputs>({
        resolver: yupResolver(signupSchema),
    });

    const router = useRouter();

    const onSubmit = async (data: SignUpFormInputs) => {
        try {
            dispatch(hideAlert());
            dispatch(setIsLoading(true));
            await axios.post("/auth/register", data);
            dispatch(showAlert({ message: "회원가입이 완료되었습니다. 이메일 인증을 진행 후 로그인 해주세요.", type: "success", show: true }));
            router.push("/signin");
        } catch (error) {
            dispatch(showAlert({ message: "회원가입에 실패했습니다. 다시 시도해 주세요.", type: "error", show: true }));
            console.error(error);
        }
    };

    return (
        <>
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

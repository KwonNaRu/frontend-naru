"use client";

import { useEffect } from "react";
import { signIn } from "@/store/authSlice";
import axiosInstance from "@/configs/axiosConfig";
import { useAppDispatch } from "@/store/hooks";

export default function AuthChecker() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        // 서버에 인증 상태 확인 요청
        axiosInstance
            .get("/auth/status")
            .then((response) => {
                const userInfo = response.data;
                dispatch(signIn(userInfo));
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    axiosInstance.post("/auth/refresh").then((response) => {
                        const userInfo = response.data;
                        dispatch(signIn(userInfo));
                    });
                }
            });
    }, [dispatch]);

    return null; // 렌더링할 내용 없음
}

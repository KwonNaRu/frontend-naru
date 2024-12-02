"use client";

import { useEffect, useState } from "react";
import { signIn } from "@/store/authSlice";
import axiosInstance from "@/configs/axiosConfig";
import { useAppDispatch } from "@/store/hooks";
import Loading from "./Loading";

export default function AuthChecker() {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);

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
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [dispatch]);

    return isLoading ? <Loading /> : null; // 렌더링할 내용 없음
}

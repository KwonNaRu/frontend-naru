"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie"; // js-cookie 라이브러리 사용 권장
import { signIn, signOut } from "@/store/auth/authSlice";
import { decodeToken } from "react-jwt";

export default function AuthChecker() {
    const dispatch = useDispatch();

    useEffect(() => {
        const nidAuthCookie = Cookies.get("NID_AUTH");

        if (nidAuthCookie) {
            const decodedToken = decodeToken(nidAuthCookie) as GlobalDecodedJwtToken;

            // 필요한 정보 추출
            const username = decodedToken.sub;
            const email = decodedToken.email;
            const role = decodedToken.role;

            // 쿠키 존재 시 인증 상태로 설정
            dispatch(
                signIn({ username, email, role }) // 필요시 추가 사용자 정보
            );
        } else {
            // 쿠키 없을 경우 비인증 상태
            dispatch(signOut());
        }
    }, [dispatch]);

    return null; // 렌더링할 내용 없음
}

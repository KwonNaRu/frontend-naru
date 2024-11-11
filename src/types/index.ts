export interface DecodedJwtToken {
    sub: string;
    exp: number;
    iat: number;
    email: string;
    role: string;
}

export interface User {
    username: string;
    email: string;
}

// 조건부 타입
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
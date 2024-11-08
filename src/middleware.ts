import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // 쿠키에서 토큰 확인
    const token = request.cookies.get('NID_AUTH')

    // 인증된 사용자의 접근 제한 경로
    const guestOnlyPaths = ['/signin', '/signup']

    // 토큰이 있고, 게스트 전용 페이지에 접근하려 할 때
    if (token && guestOnlyPaths.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/', request.url))
    }
}

// 미들웨어를 적용할 경로 설정
export const config = {
    matcher: ['/signin', '/signup']
}
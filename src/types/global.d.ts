// src/types/global.d.ts
import { DecodedJwtToken } from './index';

declare global {
    // Window 객체에 커스텀 속성 추가 가능
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }

    // 전역에서 사용할 수 있는 타입 확장
    type GlobalDecodedJwtToken = DecodedJwtToken;
}

export { };
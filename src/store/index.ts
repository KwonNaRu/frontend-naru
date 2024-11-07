import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage를 사용하기 위한 storage
import rootReducer from './reducers';

// Redux Persist 설정
// - key: localStorage에 저장될 때 사용될 키 이름
// - storage: 실제 저장소 (localStorage)
const persistConfig = {
    key: 'root',
    storage,
};

// rootReducer를 persistReducer로 감싸서 상태 지속성 추가
// - 이를 통해 페이지 새로고침해도 상태가 유지됨
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux store 생성
const store = configureStore({
    // 리듀서 설정
    reducer: persistedReducer,

    // 미들웨어 설정
    // getDefaultMiddleware는 Redux Toolkit의 기본 미들웨어를 가져오는 함수
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // 직렬화 검사 설정
            serializableCheck: {
                // Redux Persist 관련 액션들을 직렬화 검사에서 제외
                // - persist/PERSIST: 상태 유지를 시작할 때 발생하는 액션
                // - persist/REHYDRATE: 저장된 상태를 복원할 때 발생하는 액션
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

// Redux Persist의 Persistor 생성
// - 이를 통해 상태의 저장과 복원을 관리
const persistor = persistStore(store);

// store와 persistor를 내보내서 다른 파일에서 사용할 수 있게 함
export { store, persistor };
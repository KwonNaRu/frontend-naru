"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";
import { useEffect } from "react";
import AuthChecker from "./AuthChecker";
import Loading from "../Loading/Loading";
import PuppyLoader from "../Loading/PuppyLoader";
import { injectStore } from "@/configs/axiosConfig";
import Alert from "../Alert/Alert";

injectStore(store);

export default function Providers({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    useEffect(() => {
        // 브라우저가 닫히거나 새로고침될 때 상태 초기화
        const handleBeforeUnload = () => {
            persistor.purge(); // redux-persist 상태 초기화
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, []);

    return (
        <Provider store={store}>
            <PuppyLoader />
            <Alert />
            <AuthChecker>
                {/* <NavigationWrapper> */}
                <PersistGate loading={<Loading />} persistor={persistor}>
                    {children}
                </PersistGate>
                {/* </NavigationWrapper> */}
            </AuthChecker>
        </Provider>
    );
}

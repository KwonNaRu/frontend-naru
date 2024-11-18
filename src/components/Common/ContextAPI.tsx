/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext, useState } from "react";

type MessageContextType = {
    message: any;
    setMessage: (value: any) => void;
};

const MessageContext = createContext<MessageContextType>({
    message: {},
    setMessage: () => {},
});

export const MessageProvider = ({ children }: { children: React.ReactNode }) => {
    const [message, setMessage] = useState(null);

    return <MessageContext.Provider value={{ message, setMessage }}>{children}</MessageContext.Provider>;
};

export const useMessage = () => {
    const context = useContext(MessageContext);
    return context;
};

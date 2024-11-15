import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import NavigationLoading from "@/components/Common/Loading";

export default function NavigationWrapper({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(false);
    // const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        setLoading(true);
        const handleComplete = () => setLoading(false);

        handleComplete(); // Hide loader once the initial route is resolved
    }, [pathname]);

    return (
        <>
            {loading && <NavigationLoading />}
            {!loading && children}
        </>
    );
}

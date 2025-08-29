"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import MobileLoginModal from "./MobileLoginModal";

const LoginModal = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // prevent SSR/client mismatch

    return isMobile ? <MobileLoginModal /> : null;
};

export default LoginModal;

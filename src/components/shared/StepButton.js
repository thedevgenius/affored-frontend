'use client';
import { useEffect } from 'react';
import { useAdmin } from "@/lib/AdminContext";

export default function StepButton({ step, children, ...props }) {
    const { setStep } = useAdmin();

    const handleClick = () => {
        window.history.pushState({ modalStep: step }, '', '');
        setStep(step);
    };


    return (
        <button onClick={handleClick} {...props}>
            {children}
        </button>
    );
}

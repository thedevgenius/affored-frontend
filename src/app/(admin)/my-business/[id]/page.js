'use client';

import axios from "axios";
import { use, useEffect, useState } from "react";
import { redirect } from 'next/navigation';
import { useAuth } from "@/lib/AuthContext";
import { useAdmin } from "@/lib/AdminContext";
import { useMyBiz } from "@/lib/MyBizContext";
import StepButton from "@/components/shared/StepButton";
import BusinessAddress from "@/components/shared/BusinessAddress";

const BusinessProfile = ({ params }) => {
    const { user } = useAuth();
    const { step, setStep } = useAdmin();
    const { biz, refreshBiz } = useMyBiz();
    const { id } = use(params);

    useEffect(() => {
        if (!user) {
            redirect('/');
        }
        setStep('');
    }, [user]);

    useEffect(() => {
        if (step === '') {
            refreshBiz(id);
        }
    }, [step, id, refreshBiz]);


    if (step === 'address') {
        return <BusinessAddress />;
    }

    return (
        <>
            <div className="px-5 pt-5">
                <h1 className="text-2xl font-medium">My Businesses</h1>
                {biz ? (
                    <div className="mt-5">
                        <h2 className="text-xl font-medium">{biz.name}</h2>
                        <p>{biz.address?.city}</p>
                        <p>{biz.category?.name}</p>
                        <StepButton step={'address'} className="btn w-full mt-5">Add Address</StepButton>
                    </div>
                ) : (
                    <p className="mt-5">You have no business registered.</p>
                )}
            </div>

        </>
    )
}

export default BusinessProfile;
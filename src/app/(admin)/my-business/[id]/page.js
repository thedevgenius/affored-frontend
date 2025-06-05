'use client';

import axios from "axios";
import { use, useEffect, useState } from "react";
import { redirect } from 'next/navigation';
import { useAuth } from "@/lib/AuthContext";
import { useAdmin } from "@/lib/AdminContext";
import { useMyBiz } from "@/lib/MyBizContext";
import StepButton from "@/components/shared/StepButton";
import BusinessAddress from "@/components/shared/BusinessAddress";
import BizContact from "@/components/shared/BizContact";

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
        console.log(biz);
    }, [user]);

    useEffect(() => {
        if (step === '') {
            refreshBiz(id);
        }
    }, [step, id, refreshBiz]);


    if (step === 'address') {
        return <BusinessAddress />;
    }

    if (step === 'contact') { 
        return <BizContact />;
    }

    return (
        <>
            <div className="px-5 pt-5">
                <h1 className="text-2xl font-medium">My Businesses</h1>
                {biz ? (
                    <div className="mt-5">
                        <h2 className="text-xl font-medium">{biz.name}</h2>
                        <p>{biz.category?.name}</p>
                        <p>{biz.address?.city} -- <StepButton step={'address'} className="text-blue-600 underline cursor-pointer">{ biz.address ? 'Edit Address' : 'Add Address' }</StepButton></p>
                        <p>{biz.contact?.phone} -- <StepButton step={'contact'} className="text-blue-600 underline cursor-pointer">{ biz.contact ? 'Edit Contact' : 'Add Contact' }</StepButton></p>
                    </div>
                ) : (
                    <p className="mt-5">You have no business registered.</p>
                )}
            </div>

        </>
    )
}

export default BusinessProfile;
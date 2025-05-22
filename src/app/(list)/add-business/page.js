'use client';

import './business.css';
import { useEffect, useState } from 'react';
import { useLogin } from '@/lib/LoginContext';
import { useRouter } from 'next/navigation';
import Loader from "@/components/shared/loader/Loader";


const AddBusiness = () => {
    const router = useRouter();
    const { setOpenLogin, isAuthenticated, loading } = useLogin();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            setOpenLogin(true);
            router.push("/");
        }
    }, [loading, isAuthenticated, setOpenLogin, router]);

    if (loading) {
        return <Loader />;
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <>
            <div className='px-4 py-4'>
                <div className='flex items-center gap-3.5'>
                    <button className="page-back"><img src="/icons/arrow-left.svg" alt="" /></button>
                    <h5 className='text-lg font-medium'>Add New Business</h5>
                </div>
            </div>
        </>
    )
}

export default AddBusiness;
'use client';

import { useAdmin } from "@/lib/AdminContext";
import axios from "axios";
import { use, useEffect, useState } from "react";
import { redirect } from 'next/navigation';
import { useAuth } from "@/lib/AuthContext";
import { useMyBiz } from "@/lib/MyBizContext";
import ProtectedLink from "@/components/shared/ProtectedLink";

import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const addBizContactSchema = z.object({
    address: z.object({
        address_1: z.string().min(1, "Street is required"),
        address_2: z.string().min(1, "Street is required"),
        street: z.string().min(1, "Street is required"),
        landmark: z.string().min(1, "Street is required"),
        city: z.string().min(1, "City is required"),
        state: z.string().min(1, "State is required"),
        pincode: z.string().min(4, "Pincode must be at least 4 digits"),
    }),
});

const BizContact = () => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const { user } = useAuth();
    const { step, setStep } = useAdmin();
    const { biz } = useMyBiz();

    useEffect(() => {
        if (!user) {
            redirect('/');
        }
        if (biz.address) {
            reset({ address: biz.address });
        }

    }, [user]);

    useEffect(() => {
        const onPopState = (event) => {
            setStep('');
        };
        window.addEventListener('popstate', onPopState);
        return () => {
            window.removeEventListener('popstate', onPopState);
        };
    }, [setStep]);


    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(addBizContactSchema),
        defaultValues: {
            address: {
                address_1: '',
                address_2: '',
                street: '',
                landmark: '',
                city: '',
                state: '',
                pincode: '',
            },
        },
    });


    const onSubmit = (data) => {
        console.log(isSubmitting);
        const endpoint = biz.address ? 'update' : 'add';
        axios.post(
            `${baseURL}my-business/address/${endpoint}/`,
            { address: data.address, business_id: biz.id },
            { withCredentials: true }
        )
            .then((response) => {
                if (response.status === 200) {
                    reset();
                    setStep('');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <>
            <div className="px-5 pt-5">
                <h1 className="text-2xl font-medium mb-5">Add Contact Details</h1>
                {/* <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Address Line 1"
                        {...register("address.address_1")}
                        className="input p-4"
                    />
                    {errors.address?.address_1 && <p className="text-xs font-light text-red-500">{errors.address.address_1.message}</p>}
                    <input
                        type="text"
                        placeholder="Address Line 2"
                        {...register("address.address_2")}
                        className="input p-4 mt-4"
                    />
                    {errors.address?.address_2 && <p className="text-xs font-light text-red-500">{errors.address.address_2.message}</p>}
                    <input
                        type="text"
                        placeholder="Street Address"
                        {...register("address.street")}
                        className="input p-4 mt-4"
                    />
                    {errors.address?.street && <p className="text-xs font-light text-red-500">{errors.address.street.message}</p>}
                    <input
                        type="text"
                        placeholder="Landmark"
                        {...register("address.landmark")}
                        className="input p-4 mt-4"
                    />
                    {errors.address?.landmark && <p className="text-xs font-light text-red-500">{errors.address.landmark.message}</p>}
                    <input
                        type="text"
                        placeholder="PIN"
                        {...register("address.pincode")}
                        onChange={handlePincodeChange}
                        className="input p-4 mt-4"
                    />
                    {errors.address?.pincode && <p className="text-xs font-light text-red-500">{errors.address.pincode.message}</p>}
                    <input
                        type="text"
                        placeholder="City"
                        {...register("address.city")}
                        className="input p-4 mt-4"
                    />
                    {errors.address?.city && <p className="text-xs font-light text-red-500">{errors.address.city.message}</p>}
                    <input
                        type="text"
                        placeholder="State"
                        {...register("address.state")}
                        disabled
                        className="input p-4 mt-4"
                    />
                    {errors.address?.state && <p className="text-xs font-light text-red-500">{errors.address.state.message}</p>}

                    <button className="btn w-full mt-5">SAVE & Continue</button>
                </form> */}
            </div>

        </>
    )
}

export default BizContact;
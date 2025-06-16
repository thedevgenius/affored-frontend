'use client';

import { useAdmin } from "@/lib/AdminContext";
import axios from "axios";
import { use, useEffect, useState } from "react";
import { redirect } from 'next/navigation';
import { useAuth } from "@/lib/AuthContext";
import { useMyBiz } from "@/lib/MyBizContext";
import { toast } from "react-hot-toast";

import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const addBusinessAddressSchema = z.object({
    address: z.object({
        address_1: z.string().min(1, "Please enter a Flat, House no., Building, Apartment"),
        address_2: z.string().min(1, "PLease enter Area, Street, Sector, Village"),
        // street: z.string().min(1, "Street is required"),
        landmark: z.string().optional(),
        pincode: z.string().min(4, "Pincode must be at least 4 digits"),
        city: z.string().min(1, "City is required"),
        state: z.string().min(1, "State is required"),
    }),
});

const BusinessAddress = () => {
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



    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(addBusinessAddressSchema),
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



    const handlePincodeChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 6) {
            value = value.slice(0, 6);
        }
        setValue('address.pincode', value);
        if (value.length == 6) {
            axios.get(`https://api.postalpincode.in/pincode/${value}`)
                .then((response) => {
                    if (response.data[0].Status == "Success") {
                        setValue('address.state', response.data[0].PostOffice[0].State);
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
        } else {
            setValue('address.state', '');
        }

    }

    const onSubmit = (data) => {
        console.log(isSubmitting);
        const endpoint = biz.address ? 'update' : 'add';
        axios.post(
            `${baseURL}b/address/${endpoint}/`,
            { address: data.address, business_id: biz.id },
            { withCredentials: true }
        )
            .then((response) => {
                if (response.status === 200) {
                    reset();
                    if (localStorage.getItem('source') === 'add-business') { 
                        setStep('contact');
                        window.history.pushState({ modalStep: 'contact' }, '', '');
                    } else {
                        setStep('');
                        localStorage.removeItem('source');   
                    }
                    toast.success('Address details saved successfully');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <>
            <div className="AdminPageHeader px-3 py-3.5 border-b border-gray-100 shadow-sm">
                <div className="flex items-center gap-4">
                    <button><img src="/icons/arrow-left-long.svg" alt="Back Button" /></button> <h1 className="text-lg font-bold uppercase">Add Address</h1>
                </div>
            </div>

            <div className="px-3 py-7">
                <div className="CurrentLocationBtn mb-3">
                    <button type="button">Use my current location </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    
                    <div className="InputItem">
                        <input
                            type="text"
                            id="address_1"
                            name="address_1"
                            autoFocus={false}
                            autoComplete="off"
                            placeholder=""
                            {...register("address.address_1")}
                            className={`Input ${errors.address?.address_1 ? 'InputError' : ''}`}
                        />
                        <label htmlFor="address_1">Flat, House no., Building, Apartment</label>
                        {errors.address?.address_1 && <p className="text-xs font-light text-red-500">{errors.address.address_1.message}</p>}
                    </div>

                    <div className="InputItem">
                        <input
                            type="text"
                            id="address_2"
                            name="address_2"
                            autoFocus={false}
                            autoComplete="off"
                            placeholder=""
                            {...register("address.address_2")}
                            className={`Input ${errors.address?.address_2 ? 'InputError' : ''}`}
                        />
                        <label htmlFor="address_2">Area, Street, Sector, Village</label>
                        {errors.address?.address_2 && <p className="text-xs font-light text-red-500">{errors.address.address_2.message}</p>}
                    </div>

                    <div className="InputItem">
                        <input
                            type="text"
                            id="landmark"
                            name="landmark"
                            autoFocus={false}
                            autoComplete="off"
                            placeholder=""
                            {...register("address.landmark")}
                            className={`Input ${errors.address?.landmark ? 'InputError' : ''}`}
                        />
                        <label htmlFor="landmark">Landmark</label>
                        {errors.address?.landmark && <p className="text-xs font-light text-red-500">{errors.address.landmark.message}</p>}
                    </div>

                    <div className="InputItem">
                        <input
                            type="text"
                            id="pincode"
                            name="pincode"
                            autoFocus={false}
                            autoComplete="off"
                            placeholder=""
                            {...register("address.pincode")}
                            onChange={handlePincodeChange}
                            className={`Input ${errors.address?.pincode ? 'InputError' : ''}`}
                        />
                        <label htmlFor="pincode">Pincode</label>
                        {errors.address?.pincode && <p className="text-xs font-light text-red-500">{errors.address.pincode.message}</p>}
                    </div>

                    <div className="InputItem">
                        <input
                            type="text"
                            id="city"
                            name="city"
                            autoFocus={false}
                            autoComplete="off"
                            placeholder=""
                            {...register("address.city")}
                            className={`Input ${errors.address?.city ? 'InputError' : ''}`}
                        />
                        <label htmlFor="city">City</label>
                        {errors.address?.city && <p className="text-xs font-light text-red-500">{errors.address.city.message}</p>}
                    </div>

                    <div className="InputItem">
                        <input
                            type="text"
                            id="state"
                            name="state"
                            autoFocus={false}
                            autoComplete="off"
                            placeholder=""
                            {...register("address.state")}
                            className={`Input ${errors.address?.state ? 'InputError' : ''}`}
                        />
                        <label htmlFor="state">State</label>
                        {errors.address?.state && <p className="text-xs font-light text-red-500">{errors.address.state.message}</p>}
                    </div>        

                    <button type="submit" className="Btn BtnPrimary w-full">Save</button>
                </form>
            </div>

        </>
    )
}

export default BusinessAddress;
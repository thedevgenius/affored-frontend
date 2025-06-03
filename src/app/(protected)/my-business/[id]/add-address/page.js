'use client';

import axios from "axios";
import { use, useEffect, useState } from "react";
import { redirect } from 'next/navigation';
import { useAuth } from "@/lib/AuthContext";
import ProtectedLink from "@/components/shared/ProtectedLink";

import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const addBusinessAddressSchema = z.object({
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

const AddAddress = ({ params }) => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const { user } = useAuth();
    const [business, setBusiness] = useState(null);
    const { id } = use(params);

    useEffect(() => {
        if (!user) {
            redirect('/');
        }
    }, []);

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

    // const pincode = watch('address.pincode', '');
    // const state = watch('address.state', '');

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
        console.log(data);
        axios.post(`${baseURL}my-business/address/add/`, {address: data.address, business_id: id}, {withCredentials: true})
            .then((response) => {
                if (response.status == 200) {
                    console.log(response.data);
                }
            })
    }

    return (
        <>
            <div className="px-5 pt-5">
                <h1 className="text-2xl font-medium mb-5">Add Address</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                </form>
            </div>

        </>
    )
}

export default AddAddress;
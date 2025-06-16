'use client';

import { useEffect } from "react";
import dynamic from 'next/dynamic';
import { redirect, useRouter } from 'next/navigation';

import axios from "axios";
import { toast } from "react-hot-toast";

import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "@/lib/AuthContext";
import { useAdmin } from "@/lib/AdminContext";
import { Logout } from "@/lib/Logout";

const CategorySelect = dynamic(() => import('@/components/shared/CategorySelect'), {
    ssr: false,
});

const addBusinessSchema = z.object({
    name: z.string().min(1, "Business name is required"),
    description: z.string().min(1, "Description is required"),
    category: z
        .object({
            value: z.string(),
            label: z.string(),
        })
        .nullable()
        .refine((val) => !!val, {
            message: "Please select a category.",
        }),
});

const AddBusiness = () => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const { user } = useAuth();
    const { step, setStep } = useAdmin();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            redirect('/');
        }
    }, [user]);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(addBusinessSchema),
        defaultValues: {
            name: "",
            description: "",
            category: null,
        }
    });

    const onSubmit = (data) => {
        axios.post(baseURL + 'business/add/', { category_id: data.category.value, name: data.name, description: data.description }, { withCredentials: true })
            .then((response) => {
                if (response.status == 201) {
                    localStorage.setItem('source', 'add-business');
                    router.replace(`/my-business/${response.data.id}`);
                }
            })
            .catch((error) => {
                console.error(error);
            })
        // .finally(() => {
        //     setStep('address');
        //     toast.success("Business added successfully!");
        // });
    };

    const onError = (errors) => {
        const firstErrorKey = Object.keys(errors)[0];
        const firstErrorMessage = errors[firstErrorKey]?.message || "Validation error";
        toast.error(firstErrorMessage);
    };



    return (
        <>
            <div className="AdminPageHeader px-3 py-3.5 border-b border-gray-100 shadow-sm">
                <div className="flex items-center gap-4">
                    <button><img src="/icons/arrow-left-long.svg" alt="Back Button" /></button> <h1 className="text-lg font-bold uppercase">Add New Business</h1>
                </div>
            </div>

            <div className="px-3 py-7">
                <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">

                    <div className="InputItem">
                        <input
                            type="text"
                            id="name"
                            autoFocus={false}
                            autoComplete="off"
                            placeholder=""
                            className={`Input ${errors.name ? 'InputError' : ''}`}
                            {...register("name")}
                        />
                        <label htmlFor="name">Business Name</label>
                        {errors.name && <p className="ErrorMessage">{errors.name.message}</p>}
                    </div>

                    <div className="InputItem">
                        <textarea
                            id="description"
                            autoFocus={false}
                            autoComplete="off"
                            placeholder=""
                            className={`Textarea ${errors.description ? 'InputError' : ''}`}
                            {...register("description")}

                        />
                        <label htmlFor="description">Business Description</label>
                        {errors.description && <p className="ErrorMessage">{errors.description.message}</p>}
                    </div>
                

                    <div className="InputItem">
                        <Controller
                            name="category"
                            control={control}
                            render={({ field }) => (
                                <CategorySelect field={field} error={errors.category} />
                            )}
                        />
                    </div>
                    <button type="submit" className="Btn BtnPrimary w-full mt-2 ">Add & Continue</button>
                </form>
            </div>
        </>
    );
};

export default AddBusiness;

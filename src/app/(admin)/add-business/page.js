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

const Profile = () => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const { user } = useAuth();
    const { setStep, setBiz } = useAdmin();
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
        axios.post(baseURL + 'business/add/', { category_id: data.category.value, name: data.name, description: data.description }, {withCredentials: true})
            .then((response) => {
                if (response.status == 201) {
                    router.push(`/my-business/${response.data.id}`);
                    setStep('address');
                    setBiz(response.data.id);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const onError = (errors) => {
        const firstErrorKey = Object.keys(errors)[0];
        const firstErrorMessage = errors[firstErrorKey]?.message || "Validation error";
        toast.error(firstErrorMessage);
    };



    return (
        <div className="px-5 pt-5 max-w-xl mx-auto">
            <h1 className="text-2xl font-semibold mb-4">Add New Business</h1>

            <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
                <input
                    type="text"
                    className={`input px-4 w-full ${errors.name ? '!border-red-400 border' : ''}`}
                    placeholder="Enter Business Name"
                    {...register("name")}
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}

                <textarea
                    className={`input px-4 mt-2 !h-32 w-full ${errors.description ? '!border-red-400 border' : ''}`}
                    placeholder="Enter Business Description"
                    {...register("description")}
                />
                {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}

                <div className="mt-2">
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <CategorySelect field={field} error={errors.category} />
                        )}
                    />
                </div>
                <button type="submit" className="btn w-full mt-5">ADD</button>
            </form>

            {user && (
                <div>
                    <button onClick={Logout} className="text-red-600 mt-10 cursor-pointer">Logout</button>
                </div>
            )}
        </div>
    );
};

export default Profile;

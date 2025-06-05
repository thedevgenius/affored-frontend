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

const addBizContactSchema = z.object({
    contact: z.object({
        phone: z.string().regex(/^\d{10}$/, "Enter a valid phone number").optional(),
        phone_alt: z.string().optional(),
        whatsapp: z.string().optional(),
        email: z.string().email("Invalid email address").or(z.literal("")).optional(),
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
        if (biz.contact) {
            reset({ contact: biz.contact });
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
            contact: {
                phone: '',
                phone_alt: '',
                whatsapp: '',
                email: '',
            },
        },
    });

    const handleSamePhone = (e) => {
        if (e.target.checked) {
            setValue("contact.phone", user.phone);
            document.getElementById("phone").setAttribute("disabled", true);
        } else {
            setValue("contact.phone", "");
            document.getElementById("phone").removeAttribute("disabled");
        }
    };

    const onSubmit = (data) => {
        console.log(isSubmitting);
        const endpoint = biz.contact ? 'update' : 'add';
        axios.post(
            `${baseURL}b/contact/${endpoint}/`,
            { contact: data.contact, business_id: biz.id },
            { withCredentials: true }
        )
            .then((response) => {
                if (response.status === 200) {
                    reset();
                    setStep('');
                    toast.success('Contact details saved successfully');
                    window.history.back();
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Phone"
                        {...register("contact.phone")}
                        className="input p-4"
                        id="phone"
                    />
                    {errors.contact?.phone && <p className="text-xs font-light text-red-500">{errors.contact.phone.message}</p>}

                    <input type="checkbox" className="mr-1" id="isSamePhone" onChange={handleSamePhone} />
                    <label htmlFor="isSamePhone">Same as Phone</label>
                    
                    <input
                        type="text"
                        placeholder="Alternate Phone"
                        {...register("contact.phone_alt")}
                        className="input p-4 mt-4"
                    />
                    {errors.contact?.phone_alt && <p className="text-xs font-light text-red-500">{errors.contact.phone_alt.message}</p>}
                    <input
                        type="text"
                        placeholder="WhatsApp"
                        {...register("contact.whatsapp")}
                        className="input p-4 mt-4"
                    />
                    {errors.contact?.whatsapp && <p className="text-xs font-light text-red-500">{errors.contact.whatsapp.message}</p>}
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("contact.email")}
                        className="input p-4 mt-4"
                    />
                    {errors.contact?.email && <p className="text-xs font-light text-red-500">{errors.contact.email.message}</p>}
                    <button className="btn w-full mt-5">SAVE & Continue</button>
                </form>
            </div>

        </>
    )
}

export default BizContact;
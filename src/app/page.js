'use client';

import "./home.css";

import { useEffect } from "react";
import Link from "next/link";

import { useAuth } from "@/lib/AuthContext";
import ProtectedLink from "@/components/shared/ProtectedLink";
import SelectLocation from "@/components/shared/SelectLocation";

export default function Home() {
    const { user } = useAuth();
    useEffect(() => {

    }, []);

    return (
        <>
            <div className="PageHeader">
                <div className="flex items-center justify-between pt-2 px-3">
                    <div className="WelcomeText">
                        <h6 className="font-semibold text-white">Book or Buy?</h6>
                        <h1 className="font-bold text-2xl text-white">We have it all</h1>
                    </div>

                    <div className="UserData">
                        <ProtectedLink href="/profile"><img src="/icons/user-profile.svg" width={40} alt="User Profile Icon" /></ProtectedLink>
                    </div>
                </div>

                <div className="SelectLocation px-3 flex items-center gap-1">
                    <svg width="20" className="fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0009 14.1699C9.87086 14.1699 8.13086 12.4399 8.13086 10.2999C8.13086 8.15994 9.87086 6.43994 12.0009 6.43994C14.1309 6.43994 15.8709 8.16994 15.8709 10.3099C15.8709 12.4499 14.1309 14.1699 12.0009 14.1699ZM12.0009 7.93994C10.7009 7.93994 9.63086 8.99994 9.63086 10.3099C9.63086 11.6199 10.6909 12.6799 12.0009 12.6799C13.3109 12.6799 14.3709 11.6199 14.3709 10.3099C14.3709 8.99994 13.3009 7.93994 12.0009 7.93994Z" />
                        <path d="M11.9997 22.76C10.5197 22.76 9.02969 22.2 7.86969 21.09C4.91969 18.25 1.65969 13.72 2.88969 8.33C3.99969 3.44 8.26969 1.25 11.9997 1.25C11.9997 1.25 11.9997 1.25 12.0097 1.25C15.7397 1.25 20.0097 3.44 21.1197 8.34C22.3397 13.73 19.0797 18.25 16.1297 21.09C14.9697 22.2 13.4797 22.76 11.9997 22.76ZM11.9997 2.75C9.08969 2.75 5.34969 4.3 4.35969 8.66C3.27969 13.37 6.23969 17.43 8.91969 20C10.6497 21.67 13.3597 21.67 15.0897 20C17.7597 17.43 20.7197 13.37 19.6597 8.66C18.6597 4.3 14.9097 2.75 11.9997 2.75Z" />
                    </svg>
                    <SelectLocation />
                </div>

                <div className="SearchBar px-3 py-2.5">
                    <div className="SearchInput">
                        <img src="/icons/search.svg" alt="Search Icon" />
                        <input type="text" placeholder="Search..." />
                    </div>
                </div>

                <div className="PageTabs pt-2.5 border-b border-gray-300 overflow-hidden">
                    <div className="Tabs flex items-center gap-4 px-3 overflow-x-auto">
                        <div className="TabItem rounded-tl-xl rounded-tr-xl pb-0.5 pt-2 px-3 bg-[#193D8B]">
                            <Link href="/bookings">
                                <svg width="24" height="24" className="mx-auto fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.6998 22.75H9.29977C4.35977 22.75 2.25977 20.64 2.25977 15.71V11.22C2.25977 10.81 2.59977 10.47 3.00977 10.47C3.41977 10.47 3.75977 10.81 3.75977 11.22V15.71C3.75977 19.8 5.20977 21.25 9.29977 21.25H14.6898C18.7798 21.25 20.2298 19.8 20.2298 15.71V11.22C20.2298 10.81 20.5698 10.47 20.9798 10.47C21.3898 10.47 21.7298 10.81 21.7298 11.22V15.71C21.7398 20.64 19.6298 22.75 14.6998 22.75Z" />
                                    <path d="M11.999 12.75C10.899 12.75 9.89902 12.32 9.18902 11.53C8.47902 10.74 8.14902 9.71 8.25902 8.61L8.92903 1.93C8.96903 1.55 9.28903 1.25 9.67903 1.25H14.349C14.739 1.25 15.059 1.54 15.099 1.93L15.769 8.61C15.879 9.71 15.549 10.74 14.839 11.53C14.099 12.32 13.099 12.75 11.999 12.75ZM10.349 2.75L9.74902 8.76C9.67902 9.43 9.87903 10.06 10.299 10.52C11.149 11.46 12.849 11.46 13.699 10.52C14.119 10.05 14.319 9.42 14.249 8.76L13.649 2.75H10.349Z" />
                                    <path d="M18.31 12.75C16.28 12.75 14.47 11.11 14.26 9.09L13.56 2.08C13.54 1.87 13.61 1.66 13.75 1.5C13.89 1.34 14.09 1.25 14.31 1.25H17.36C20.3 1.25 21.67 2.48 22.08 5.5L22.36 8.28C22.48 9.46 22.12 10.58 21.35 11.43C20.58 12.28 19.5 12.75 18.31 12.75ZM15.14 2.75L15.76 8.94C15.89 10.19 17.05 11.25 18.31 11.25C19.07 11.25 19.75 10.96 20.24 10.43C20.72 9.9 20.94 9.19 20.87 8.43L20.59 5.68C20.28 3.42 19.55 2.75 17.36 2.75H15.14Z" />
                                    <path d="M5.63904 12.75C4.44904 12.75 3.36904 12.28 2.59904 11.43C1.82904 10.58 1.46904 9.46 1.58904 8.28L1.85904 5.53C2.27904 2.48 3.64904 1.25 6.58905 1.25H9.63904C9.84904 1.25 10.049 1.34 10.199 1.5C10.349 1.66 10.409 1.87 10.389 2.08L9.68904 9.09C9.47904 11.11 7.66904 12.75 5.63904 12.75ZM6.58905 2.75C4.39904 2.75 3.66904 3.41 3.34904 5.7L3.07904 8.43C2.99904 9.19 3.22904 9.9 3.70904 10.43C4.18904 10.96 4.86904 11.25 5.63904 11.25C6.89904 11.25 8.06904 10.19 8.18904 8.94L8.80905 2.75H6.58905Z" />
                                    <path d="M14.5 22.75H9.5C9.09 22.75 8.75 22.41 8.75 22V19.5C8.75 17.4 9.9 16.25 12 16.25C14.1 16.25 15.25 17.4 15.25 19.5V22C15.25 22.41 14.91 22.75 14.5 22.75ZM10.25 21.25H13.75V19.5C13.75 18.24 13.26 17.75 12 17.75C10.74 17.75 10.25 18.24 10.25 19.5V21.25Z" />
                                </svg>
                                <span className="text-white text-base">All</span>
                            </Link>
                        </div>
                        <div className="TabItem rounded-tl-xl rounded-tr-xl pb-0.5 pt-2 px-3">
                            <Link href="/bookings" className="text-center">
                                <svg width="24" height="24" className="mx-auto fill-black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.6998 22.75H9.29977C4.35977 22.75 2.25977 20.64 2.25977 15.71V11.22C2.25977 10.81 2.59977 10.47 3.00977 10.47C3.41977 10.47 3.75977 10.81 3.75977 11.22V15.71C3.75977 19.8 5.20977 21.25 9.29977 21.25H14.6898C18.7798 21.25 20.2298 19.8 20.2298 15.71V11.22C20.2298 10.81 20.5698 10.47 20.9798 10.47C21.3898 10.47 21.7298 10.81 21.7298 11.22V15.71C21.7398 20.64 19.6298 22.75 14.6998 22.75Z" />
                                    <path d="M11.999 12.75C10.899 12.75 9.89902 12.32 9.18902 11.53C8.47902 10.74 8.14902 9.71 8.25902 8.61L8.92903 1.93C8.96903 1.55 9.28903 1.25 9.67903 1.25H14.349C14.739 1.25 15.059 1.54 15.099 1.93L15.769 8.61C15.879 9.71 15.549 10.74 14.839 11.53C14.099 12.32 13.099 12.75 11.999 12.75ZM10.349 2.75L9.74902 8.76C9.67902 9.43 9.87903 10.06 10.299 10.52C11.149 11.46 12.849 11.46 13.699 10.52C14.119 10.05 14.319 9.42 14.249 8.76L13.649 2.75H10.349Z" />
                                    <path d="M18.31 12.75C16.28 12.75 14.47 11.11 14.26 9.09L13.56 2.08C13.54 1.87 13.61 1.66 13.75 1.5C13.89 1.34 14.09 1.25 14.31 1.25H17.36C20.3 1.25 21.67 2.48 22.08 5.5L22.36 8.28C22.48 9.46 22.12 10.58 21.35 11.43C20.58 12.28 19.5 12.75 18.31 12.75ZM15.14 2.75L15.76 8.94C15.89 10.19 17.05 11.25 18.31 11.25C19.07 11.25 19.75 10.96 20.24 10.43C20.72 9.9 20.94 9.19 20.87 8.43L20.59 5.68C20.28 3.42 19.55 2.75 17.36 2.75H15.14Z" />
                                    <path d="M5.63904 12.75C4.44904 12.75 3.36904 12.28 2.59904 11.43C1.82904 10.58 1.46904 9.46 1.58904 8.28L1.85904 5.53C2.27904 2.48 3.64904 1.25 6.58905 1.25H9.63904C9.84904 1.25 10.049 1.34 10.199 1.5C10.349 1.66 10.409 1.87 10.389 2.08L9.68904 9.09C9.47904 11.11 7.66904 12.75 5.63904 12.75ZM6.58905 2.75C4.39904 2.75 3.66904 3.41 3.34904 5.7L3.07904 8.43C2.99904 9.19 3.22904 9.9 3.70904 10.43C4.18904 10.96 4.86904 11.25 5.63904 11.25C6.89904 11.25 8.06904 10.19 8.18904 8.94L8.80905 2.75H6.58905Z" />
                                    <path d="M14.5 22.75H9.5C9.09 22.75 8.75 22.41 8.75 22V19.5C8.75 17.4 9.9 16.25 12 16.25C14.1 16.25 15.25 17.4 15.25 19.5V22C15.25 22.41 14.91 22.75 14.5 22.75ZM10.25 21.25H13.75V19.5C13.75 18.24 13.26 17.75 12 17.75C10.74 17.75 10.25 18.24 10.25 19.5V21.25Z" />
                                </svg>
                                <span className="text-black text-base">Doctors</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="FeaturedCategories px-3 py-4">
                <h2 className="font-bold text-xl mb-2">Featured Categories</h2>
                <div className="CatRow grid grid-cols-4 gap-2">
                    <div className="CatItem">
                        <Link href="/doctors?specialty=cardiology">
                            <div className="CatThumb">
                                <img src="/icons/makeup.png" alt="Cardiology" />
                            </div>
                            <h3 className="text-center text-base font-semibold text-black">Beauty</h3>
                        </Link>
                    </div>
                    <div className="CatItem">
                        <Link href="/doctors?specialty=cardiology">
                            <div className="CatThumb">
                                <img src="/icons/makeup.png" alt="Cardiology" />
                            </div>
                            <h3 className="text-center text-base font-semibold text-black">Beauty</h3>
                        </Link>
                    </div>
                    <div className="CatItem">
                        <Link href="/doctors?specialty=cardiology">
                            <div className="CatThumb">
                                <img src="/icons/makeup.png" alt="Cardiology" />
                            </div>
                            <h3 className="text-center text-base font-semibold text-black">Beauty</h3>
                        </Link>
                    </div>
                    <div className="CatItem">
                        <Link href="/doctors?specialty=cardiology">
                            <div className="CatThumb">
                                <img src="/icons/makeup.png" alt="Cardiology" />
                            </div>
                            <h3 className="text-center text-base font-semibold text-black">Beauty</h3>
                        </Link>
                    </div>
                    <div className="CatItem">
                        <Link href="/doctors?specialty=cardiology">
                            <div className="CatThumb">
                                <img src="/icons/makeup.png" alt="Cardiology" />
                            </div>
                            <h3 className="text-center text-base font-semibold text-black">Beauty</h3>
                        </Link>
                    </div>
                    <div className="CatItem">
                        <Link href="/doctors?specialty=cardiology">
                            <div className="CatThumb">
                                <img src="/icons/makeup.png" alt="Cardiology" />
                            </div>
                            <h3 className="text-center text-base font-semibold text-black">Beauty</h3>
                        </Link>
                    </div>
                    <div className="CatItem">
                        <Link href="/doctors?specialty=cardiology">
                            <div className="CatThumb">
                                <img src="/icons/makeup.png" alt="Cardiology" />
                            </div>
                            <h3 className="text-center text-base font-semibold text-black">Beauty</h3>
                        </Link>
                    </div>
                    <div className="CatItem">
                        <Link href="/doctors?specialty=cardiology">
                            <div className="CatThumb">
                                <img src="/icons/makeup.png" alt="Cardiology" />
                            </div>
                            <h3 className="text-center text-base font-semibold text-black">Beauty</h3>
                        </Link>
                    </div>
                </div>
                <Link href='#' className="Btn BtnSm BtnOutlineSecondary w-full mt-4">View All Categories
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.0001 11.9999C17.9952 11.4738 17.7832 10.9708 17.4101 10.5999L13.1201 6.29995C12.9327 6.1137 12.6792 6.00916 12.4151 6.00916C12.1509 6.00916 11.8974 6.1137 11.7101 6.29995C11.6163 6.39291 11.5419 6.50351 11.4912 6.62537C11.4404 6.74723 11.4143 6.87794 11.4143 7.00995C11.4143 7.14196 11.4404 7.27266 11.4912 7.39452C11.5419 7.51638 11.6163 7.62698 11.7101 7.71995L15.0001 10.9999H5.00006C4.73484 10.9999 4.48049 11.1053 4.29295 11.2928C4.10542 11.4804 4.00006 11.7347 4.00006 11.9999C4.00006 12.2652 4.10542 12.5195 4.29295 12.707C4.48049 12.8946 4.73484 12.9999 5.00006 12.9999H15.0001L11.7101 16.2899C11.5218 16.4769 11.4154 16.731 11.4145 16.9964C11.4136 17.2618 11.5181 17.5166 11.7051 17.7049C11.892 17.8932 12.1462 17.9996 12.4115 18.0005C12.6769 18.0014 12.9318 17.8969 13.1201 17.7099L17.4101 13.4099C17.7856 13.0366 17.9978 12.5295 18.0001 11.9999Z" />
                    </svg>
                </Link>
            </div>

            <div className="AddBusinessCta px-3 py-4">
                <div className="bg-[#D4DEF4] p-4 rounded-2xl relative cta">
                    <div className="flex justify-between items-center">
                        <div className="CtaContent">
                            <h3 className="text-2xl font-bold mb-2.5">Add Your Business <span className="text-[#193D8B] uppercase">For Free</span></h3>
                            {/* <ProtectedLink className="BtnSm BtnPrimary" href={'/add-business'}>Add Business</ProtectedLink> */}
                            <Link className="BtnSm BtnPrimary" href={'/add-business'}>Add Business</Link>
                        </div>
                        <img src="/images/add-business.svg" alt="" />
                    </div>
                </div>
            </div>
           
        </>
    );
}

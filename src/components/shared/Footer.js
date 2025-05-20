'use client'

import Link from "next/link";
import Image from "next/image";
import Login from "./Login";
import home from "../../../public/icons/home.svg";
import search from "../../../public/icons/search.svg";
import user from "../../../public/icons/profile.svg";
import login from "../../../public/icons/login.svg";

import { useLogin } from "@/lib/LoginContext";
import useAuth from "@/hooks/useAuth";
import { redirect } from 'next/navigation';
import { logout } from "@/lib/logout";


const Footer = () => {
    const { setOpenLogin, isLogin } = useLogin();

    const handleLoginClick = () => {
        if (isLogin) {
            redirect("/dashboard");
        } else {
            setOpenLogin(true);
        }
        
    }

    return (
        <>
            <footer className="footer">
                <ul>
                    <li><Link href="/"><Image src={home} width={25} height={25} alt="Home Icon" /></Link></li>
                    <li><Link href="/search"><Image src={search} width={25} height={25} alt="Search Icon" /></Link></li>
                    <li><Link href="/dashboard"><Image src={user} width={25} height={25} alt="User Icon" /></Link></li>
                    <li><button onClick={handleLoginClick}><Image src={login} width={25} height={25} alt="Login Icon" /></button></li>
                    <li><button onClick={logout}><Image src={login} width={25} height={25} alt="Login Icon" /></button></li>
                </ul>
            </footer>
            <Login />
        </>
    )
}

export default Footer;
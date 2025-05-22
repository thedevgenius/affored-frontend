'use client'

import Link from "next/link";
import Image from "next/image";
import Login from "../login/Login"
import home from "../../../../public/icons/home.svg";
import search from "../../../../public/icons/search.svg";
import user from "../../../../public/icons/profile.svg";
import login from "../../../../public/icons/login.svg";

import { useLogin } from "@/lib/LoginContext";
import { logout } from "@/lib/logout";
import Loader from "../loader/Loader";
import { useRouter } from "next/navigation";


const Footer = () => {
    const { setOpenLogin, isAuthenticated, loading } = useLogin();
    const router = useRouter();

    const handleLoginClick = () => {
        // if (loading) {
        //     return <Loader />;
        // }
        if (!isAuthenticated) {
            setOpenLogin(true);

        } else {
            router.push('/dashboard');
        }
    }

    return (
        <>
            <footer className="footer">
                <ul>
                    <li><Link href="/"><Image src={home} width={25} height={25} alt="Home Icon" /></Link></li>
                    <li><Link href="/search"><Image src={search} width={25} height={25} alt="Search Icon" /></Link></li>
                    <li><button onClick={handleLoginClick}><Image src={user} width={25} height={25} alt="User Icon" /></button></li>
                    {/* <li><button onClick={handleLoginClick}><Image src={login} width={25} height={25} alt="Login Icon" /></button></li> */}
                    <li><button onClick={logout}><Image src={login} width={25} height={25} alt="Login Icon" /></button></li>
                </ul>
            </footer>
            <Login />
        </>
    )
}

export default Footer;
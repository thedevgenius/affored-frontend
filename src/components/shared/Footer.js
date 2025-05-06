import Link from "next/link";
import Image from "next/image";
import home from "../../../public/icons/home.svg";
import search from "../../../public/icons/search.svg";
import user from "../../../public/icons/profile.svg";
import login from "../../../public/icons/login.svg";

const Footer = () => {
    return (
        <footer className="footer">
            <ul>
                <li><Link href="/"><Image src={home} width={25} height={25} alt="Home Icon" /></Link></li>
                <li><Link href="/search"><Image src={search} width={25} height={25} alt="Search Icon" /></Link></li>
                <li><Link href="/profile"><Image src={user} width={25} height={25} alt="User Icon" /></Link></li>
                <li><Link href="/login"><Image src={login} width={25} height={25} alt="Login Icon" /></Link></li>
            </ul>
        </footer>
    )
}

export default Footer;
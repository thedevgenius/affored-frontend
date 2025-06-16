import "./footer.css";
import Link from "next/link";
import ProtectedLink from "../shared/ProtectedLink";

const Footer = () => {
    return (
        <>
            <div className="min-h-[70px]"></div>
            <footer className="BottomNav">
                <ul>
                    <li><Link href='/'><img src="/icons/home.svg" alt="" /><span>Home</span></Link></li>
                    <li><Link href='/'><img src="/icons/lessons.svg" alt="" /><span>Search</span></Link></li>
                    <li><Link href='/'><img src="/icons/game.svg" alt="" /><span>Categories</span></Link></li>
                    <li><ProtectedLink href='/profile'><img src="/icons/profile.svg" alt="" /><span>Profile</span></ProtectedLink></li>
                </ul>
            </footer>
        </>
    )
}

export default Footer;
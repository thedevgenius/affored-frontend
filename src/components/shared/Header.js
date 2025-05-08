import DetectLocation from "../ui/DetectLoction";

const Header = () => {
    return (
        <header className="px-3 pt-4">
            <p className="font-semibold">Guest</p>
            <span className="text-gray-500">Select Location</span>
            <DetectLocation />
        </header>
    )
}

export default Header;
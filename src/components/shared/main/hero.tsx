import Link from "next/link";
import Image from "@/images/main-hero-bg.png";

export default function Hero() {
    return (
        <div
            className="hero-h bg-center flex items-end justify-center bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${Image.src})` }}
        >
            <Link href="/products" className="mb-[78px] px-[47px] py-[17px] bg-[#333333] text-white text-[13px] rounded-[8px] select-none cursor-pointer hover:bg-[#000] duration-500">
                SHOP ALL
            </Link>
        </div>
    );
}
import Link from "next/link";

export default function Hero() {
    return (
        <div className="hero-h bg-[url('@/images/main-hero-bg.png')] bg-center flex items-end justify-center bg-no-repeat bg-cover" >
            <Link href="/products" className="mb-[78px] px-[47px] py-[17px] bg-[#333333] text-white text-[13px] rounded-[8px] select-none cursor-pointer hover:bg-[#000] duration-500">
                SHOP ALL
            </Link>
        </div>
    );
}
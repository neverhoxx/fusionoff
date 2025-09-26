import Link from "next/link";
import Image from "@/images/collection-bg.png";

export default function MainCollection() {
    return (
        <div
            className="min-h-screen bg-center bg-no-repeat w-full flex flex-col items-center justify-center select-none bg-cover main-coll"
            style={{ backgroundImage: `url(${Image.src})` }}
        >
            <h2 className="text-[30px] text-white">
                НОВАЯ КОЛЛЕКЦИЯ
            </h2>
            <Link className="mt-[72px] px-[47px] py-[17px] bg-[#333333] text-white text-[16px] rounded-[8px] select-none cursor-pointer hover:bg-[#000] duration-500" href="/products">
                Узнайте сейчас
            </Link>
        </div>
    );
}
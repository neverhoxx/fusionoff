import Link from "next/link";

export default function MainCollection() {
    return (
        <div className="min-h-screen bg-center bg-no-repeat w-full bg-[url('@/images/collection-bg.png')] flex flex-col items-center justify-center select-none bg-cover main-coll">
            <h2 className="text-[30px] text-white">
                SOME COLLECTION
            </h2>
            <Link className="mt-[72px] px-[47px] py-[17px] bg-[#333333] text-white text-[16px] rounded-[8px] select-none cursor-pointer hover:bg-[#000] duration-500" href="">
                Узнайте сейчас
            </Link>
        </div>
    );
}
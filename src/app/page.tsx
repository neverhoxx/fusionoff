import Image from "next/image";
import Hero from "@/components/shared/main/hero";
import MainProductsWrapper from "@/components/shared/main/MainProductsWrapper";
import MainCollection from "@/components/shared/main/collection";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <MainProductsWrapper />
      <MainCollection />
    </div>
  );
}

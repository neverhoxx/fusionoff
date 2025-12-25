export const dynamic = 'force-dynamic';

import Hero from "@/components/shared/main/hero";
import MainProductsWrapper from "@/components/shared/main/MainProductsWrapper";
import MainCollection from "@/components/shared/main/collection";
import MainCasesWrapper from "@/components/shared/main/MainCasesWrapper";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <MainProductsWrapper />
      <MainCollection />
      <MainCasesWrapper />
    </div>
  );
}

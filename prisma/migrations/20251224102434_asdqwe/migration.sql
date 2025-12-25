-- CreateTable
CREATE TABLE "public"."Cases" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "subtitle" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "material" TEXT,

    CONSTRAINT "Cases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CasesImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "casesId" INTEGER NOT NULL,

    CONSTRAINT "CasesImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."CasesImage" ADD CONSTRAINT "CasesImage_casesId_fkey" FOREIGN KEY ("casesId") REFERENCES "public"."Cases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

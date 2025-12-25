/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductImage` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,productId,productType]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productType` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."ProductType" AS ENUM ('JEANS', 'HOODIE', 'CASE');

-- DropForeignKey
ALTER TABLE "public"."Cart" DROP CONSTRAINT "Cart_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductImage" DROP CONSTRAINT "ProductImage_productId_fkey";

-- DropIndex
DROP INDEX "public"."Cart_userId_productId_key";

-- AlterTable
ALTER TABLE "public"."Cart" ADD COLUMN     "productType" "public"."ProductType" NOT NULL;

-- DropTable
DROP TABLE "public"."Product";

-- DropTable
DROP TABLE "public"."ProductImage";

-- CreateTable
CREATE TABLE "public"."Jeans" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "subtitle" TEXT,
    "material" TEXT,
    "dlina" TEXT,
    "koleno" TEXT,
    "polub" TEXT,
    "polup" TEXT,
    "shirinab" TEXT,
    "vihod" TEXT,
    "vipo" TEXT,

    CONSTRAINT "Jeans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."JeansImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "jeansId" INTEGER NOT NULL,

    CONSTRAINT "JeansImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Hoodies" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "subtitle" TEXT,
    "material" TEXT,

    CONSTRAINT "Hoodies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HoodiesImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "hoodiesId" INTEGER NOT NULL,

    CONSTRAINT "HoodiesImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cases" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "subtitle" TEXT,
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

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_productId_productType_key" ON "public"."Cart"("userId", "productId", "productType");

-- AddForeignKey
ALTER TABLE "public"."JeansImage" ADD CONSTRAINT "JeansImage_jeansId_fkey" FOREIGN KEY ("jeansId") REFERENCES "public"."Jeans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HoodiesImage" ADD CONSTRAINT "HoodiesImage_hoodiesId_fkey" FOREIGN KEY ("hoodiesId") REFERENCES "public"."Hoodies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CasesImage" ADD CONSTRAINT "CasesImage_casesId_fkey" FOREIGN KEY ("casesId") REFERENCES "public"."Cases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

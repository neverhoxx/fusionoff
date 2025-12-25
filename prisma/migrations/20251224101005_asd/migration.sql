/*
  Warnings:

  - You are about to drop the column `dlina` on the `Jeans` table. All the data in the column will be lost.
  - You are about to drop the column `koleno` on the `Jeans` table. All the data in the column will be lost.
  - You are about to drop the column `polub` on the `Jeans` table. All the data in the column will be lost.
  - You are about to drop the column `polup` on the `Jeans` table. All the data in the column will be lost.
  - You are about to drop the column `shirinab` on the `Jeans` table. All the data in the column will be lost.
  - You are about to drop the column `vihod` on the `Jeans` table. All the data in the column will be lost.
  - You are about to drop the column `vipo` on the `Jeans` table. All the data in the column will be lost.
  - You are about to drop the `Cases` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CasesImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."CasesImage" DROP CONSTRAINT "CasesImage_casesId_fkey";

-- AlterTable
ALTER TABLE "public"."Jeans" DROP COLUMN "dlina",
DROP COLUMN "koleno",
DROP COLUMN "polub",
DROP COLUMN "polup",
DROP COLUMN "shirinab",
DROP COLUMN "vihod",
DROP COLUMN "vipo";

-- DropTable
DROP TABLE "public"."Cases";

-- DropTable
DROP TABLE "public"."CasesImage";

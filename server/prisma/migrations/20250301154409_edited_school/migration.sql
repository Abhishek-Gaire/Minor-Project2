/*
  Warnings:

  - You are about to drop the column `address` on the `schools` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `schools` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `schools` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[schoolName]` on the table `schools` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageUrl` to the `schools` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `schools` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolAddress` to the `schools` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolName` to the `schools` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `schools` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "schools_name_key";

-- AlterTable
ALTER TABLE "schools" DROP COLUMN "address",
DROP COLUMN "name",
DROP COLUMN "state",
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "schoolAddress" TEXT NOT NULL,
ADD COLUMN     "schoolName" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "schools_schoolName_key" ON "schools"("schoolName");

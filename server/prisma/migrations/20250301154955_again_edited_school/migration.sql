/*
  Warnings:

  - Added the required column `phone` to the `schools` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "schools" ADD COLUMN     "phone" TEXT NOT NULL;

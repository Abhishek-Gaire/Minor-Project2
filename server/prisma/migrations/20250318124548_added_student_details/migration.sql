/*
  Warnings:

  - Added the required column `grade` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'other');

-- CreateEnum
CREATE TYPE "Grade" AS ENUM ('G5', 'G6', 'G7', 'G8', 'G9', 'G10');

-- CreateEnum
CREATE TYPE "Relationship" AS ENUM ('mother', 'father', 'guardian', 'other');

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "grade" "Grade" NOT NULL,
ADD COLUMN     "rollNumber" TEXT;

-- CreateTable
CREATE TABLE "StudentDetails" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "section" TEXT NOT NULL DEFAULT 'A',
    "previousSchool" TEXT,
    "academicYear" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "alternatePhone" TEXT,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "parentName" TEXT NOT NULL,
    "relationship" "Relationship" NOT NULL,
    "parentPhone" TEXT NOT NULL,
    "parentEmail" TEXT NOT NULL,
    "bloodGroup" TEXT,
    "medicalInformation" TEXT,
    "hobbies" TEXT,
    "extraCurricular" TEXT,
    "additionalNotes" TEXT,

    CONSTRAINT "StudentDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentDetails_studentId_key" ON "StudentDetails"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentDetails_parentEmail_key" ON "StudentDetails"("parentEmail");

-- AddForeignKey
ALTER TABLE "StudentDetails" ADD CONSTRAINT "StudentDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

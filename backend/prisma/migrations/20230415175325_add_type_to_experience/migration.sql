/*
  Warnings:

  - The primary key for the `Experience` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `type` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_pkey",
ADD COLUMN     "type" TEXT NOT NULL,
ADD CONSTRAINT "Experience_pkey" PRIMARY KEY ("type", "level");

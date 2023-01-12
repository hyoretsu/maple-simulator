/*
  Warnings:

  - The primary key for the `EquipRequirements` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `EquipRequirements` table. All the data in the column will be lost.
  - The primary key for the `EquipStats` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `EquipStats` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "EquipRequirements_equipId_key";

-- DropIndex
DROP INDEX "EquipStats_equipId_key";

-- AlterTable
ALTER TABLE "EquipRequirements" DROP CONSTRAINT "EquipRequirements_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "EquipRequirements_pkey" PRIMARY KEY ("equipId");

-- AlterTable
ALTER TABLE "EquipStats" DROP CONSTRAINT "EquipStats_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "EquipStats_pkey" PRIMARY KEY ("equipId");

/*
  Warnings:

  - You are about to drop the column `jump` on the `EquipmentSetBonus` table. All the data in the column will be lost.
  - You are about to drop the column `speed` on the `EquipmentSetBonus` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EquipmentSetBonus" DROP COLUMN "jump",
DROP COLUMN "speed",
ADD COLUMN     "critRate" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "dmg" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "hp" SET DEFAULT 0,
ALTER COLUMN "hp" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "mp" SET DEFAULT 0,
ALTER COLUMN "mp" SET DATA TYPE DOUBLE PRECISION;

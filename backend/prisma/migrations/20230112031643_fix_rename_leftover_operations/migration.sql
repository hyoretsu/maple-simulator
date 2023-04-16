-- AlterTable
ALTER TABLE "Equipment" RENAME CONSTRAINT "Equip_pkey" TO "Equipment_pkey";

-- AlterTable
ALTER TABLE "EquipmentRequirements" RENAME CONSTRAINT "EquipRequirements_pkey" TO "EquipmentRequirements_pkey";

-- AlterTable
ALTER TABLE "EquipmentStats" RENAME CONSTRAINT "EquipStats_pkey" TO "EquipmentStats_pkey";

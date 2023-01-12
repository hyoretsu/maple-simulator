-- DropForeignKey
ALTER TABLE "EquipRequirements" DROP CONSTRAINT "EquipRequirements_equipId_fkey";

-- DropForeignKey
ALTER TABLE "EquipStats" DROP CONSTRAINT "EquipStats_equipId_fkey";

-- RenameTable
ALTER TABLE "Equip" RENAME TO "Equipment";

-- RenameTable
ALTER TABLE "EquipRequirements" RENAME TO "EquipmentRequirements";

-- RenameTable
ALTER TABLE "EquipStats" RENAME TO "EquipmentStats";

-- AddForeignKey
ALTER TABLE "EquipmentRequirements" ADD CONSTRAINT "EquipmentRequirements_equipId_fkey" FOREIGN KEY ("equipId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentStats" ADD CONSTRAINT "EquipmentStats_equipId_fkey" FOREIGN KEY ("equipId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

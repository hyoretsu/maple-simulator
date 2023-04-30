-- AlterTable
ALTER TABLE "Equipment" ADD COLUMN     "setId" INTEGER;

-- CreateTable
CREATE TABLE "EquipmentSet" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "EquipmentSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipmentSetBonus" (
    "id" TEXT NOT NULL,
    "setId" INTEGER NOT NULL,
    "str" INTEGER NOT NULL DEFAULT 0,
    "dex" INTEGER NOT NULL DEFAULT 0,
    "int" INTEGER NOT NULL DEFAULT 0,
    "luk" INTEGER NOT NULL DEFAULT 0,
    "hp" INTEGER NOT NULL DEFAULT 0,
    "mp" INTEGER NOT NULL DEFAULT 0,
    "att" INTEGER NOT NULL DEFAULT 0,
    "matt" INTEGER NOT NULL DEFAULT 0,
    "def" INTEGER NOT NULL DEFAULT 0,
    "ied" INTEGER NOT NULL DEFAULT 0,
    "bossDmg" INTEGER NOT NULL DEFAULT 0,
    "speed" INTEGER NOT NULL DEFAULT 0,
    "jump" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "EquipmentSetBonus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EquipmentSet_name_key" ON "EquipmentSet"("name");

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_setId_fkey" FOREIGN KEY ("setId") REFERENCES "EquipmentSet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentSetBonus" ADD CONSTRAINT "EquipmentSetBonus_setId_fkey" FOREIGN KEY ("setId") REFERENCES "EquipmentSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

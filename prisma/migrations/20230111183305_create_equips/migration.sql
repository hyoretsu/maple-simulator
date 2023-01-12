-- CreateTable
CREATE TABLE "Equip" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "attackSpeed" INTEGER,
    "enhancements" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT,
    "icon" TEXT NOT NULL,
    "iconWidth" INTEGER NOT NULL,
    "iconHeight" INTEGER NOT NULL,

    CONSTRAINT "Equip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipRequirements" (
    "id" TEXT NOT NULL,
    "equipId" INTEGER NOT NULL,
    "job" TEXT NOT NULL DEFAULT 'any',
    "level" INTEGER NOT NULL DEFAULT 0,
    "str" INTEGER NOT NULL DEFAULT 0,
    "dex" INTEGER NOT NULL DEFAULT 0,
    "int" INTEGER NOT NULL DEFAULT 0,
    "luk" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "EquipRequirements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipStats" (
    "id" TEXT NOT NULL,
    "equipId" INTEGER NOT NULL,
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

    CONSTRAINT "EquipStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EquipRequirements_equipId_key" ON "EquipRequirements"("equipId");

-- CreateIndex
CREATE UNIQUE INDEX "EquipStats_equipId_key" ON "EquipStats"("equipId");

-- AddForeignKey
ALTER TABLE "EquipRequirements" ADD CONSTRAINT "EquipRequirements_equipId_fkey" FOREIGN KEY ("equipId") REFERENCES "Equip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipStats" ADD CONSTRAINT "EquipStats_equipId_fkey" FOREIGN KEY ("equipId") REFERENCES "Equip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE
    "Icon" (
        "id" TEXT NOT NULL,
        "file" TEXT NOT NULL,
        "width" INTEGER NOT NULL,
        "height" INTEGER NOT NULL,
        CONSTRAINT "Icon_pkey" PRIMARY KEY ("id")
    );

INSERT INTO
    "Icon" ("id", "file", "height", "width")
SELECT
    gen_random_uuid(),
    "icon",
    "iconHeight",
    "iconWidth"
FROM "Equipment";

ALTER TABLE "Equipment" ADD COLUMN "iconId" TEXT;

UPDATE "Equipment" AS e
SET "iconId" = (
        SELECT i.id
        FROM "Icon" AS i
        WHERE
            i."file" = e."icon"
    );

ALTER TABLE
    "Equipment" DROP COLUMN "icon",
    DROP COLUMN "iconHeight",
    DROP COLUMN "iconWidth",
ALTER COLUMN "iconId"
SET NOT NULL;

CREATE TABLE
    "Job" (
        "id" INTEGER NOT NULL,
        "name" TEXT NOT NULL,
        "classId" TEXT NOT NULL,
        "iconId" TEXT NOT NULL,
        CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
    );

ALTER TABLE "Job"
ADD
    CONSTRAINT "Job_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Job"
ADD
    CONSTRAINT "Job_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "Icon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Equipment"
ADD
    CONSTRAINT "Equipment_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "Icon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

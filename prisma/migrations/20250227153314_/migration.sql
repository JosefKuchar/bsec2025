/*
  Warnings:

  - You are about to drop the column `frequency` on the `Change` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Change" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "typeId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "from" DATETIME NOT NULL,
    "to" DATETIME NOT NULL,
    CONSTRAINT "Change_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ChangeType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Change" ("amount", "from", "id", "to", "typeId") SELECT "amount", "from", "id", "to", "typeId" FROM "Change";
DROP TABLE "Change";
ALTER TABLE "new_Change" RENAME TO "Change";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

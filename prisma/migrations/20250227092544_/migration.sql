-- CreateTable
CREATE TABLE "ChangeType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "emoji" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dir" INTEGER NOT NULL DEFAULT 1
);

-- CreateTable
CREATE TABLE "Change" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "typeId" INTEGER NOT NULL,
    "frequency" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "from" DATETIME NOT NULL,
    "to" DATETIME NOT NULL,
    CONSTRAINT "Change_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ChangeType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Goal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" INTEGER NOT NULL,
    "value" REAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "changeTypeId" INTEGER,
    CONSTRAINT "Goal_changeTypeId_fkey" FOREIGN KEY ("changeTypeId") REFERENCES "ChangeType" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

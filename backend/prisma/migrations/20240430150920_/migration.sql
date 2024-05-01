/*
  Warnings:

  - You are about to alter the column `budget` on the `project` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `totalActual` on the `project` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `project` MODIFY `budget` INTEGER NOT NULL,
    MODIFY `totalActual` INTEGER NOT NULL;

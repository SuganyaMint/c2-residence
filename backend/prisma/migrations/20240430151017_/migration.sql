/*
  Warnings:

  - You are about to alter the column `status` on the `project` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `project` MODIFY `area` VARCHAR(191) NOT NULL,
    MODIFY `status` INTEGER NOT NULL;

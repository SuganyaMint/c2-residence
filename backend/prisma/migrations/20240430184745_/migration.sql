/*
  Warnings:

  - Added the required column `date` to the `actualDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `actualDetail` ADD COLUMN `date` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `project` ADD COLUMN `date` VARCHAR(191) NOT NULL;

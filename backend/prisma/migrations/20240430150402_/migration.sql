/*
  Warnings:

  - Added the required column `area` to the `project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `project` ADD COLUMN `area` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL;

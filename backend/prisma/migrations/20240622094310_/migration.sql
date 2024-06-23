/*
  Warnings:

  - Added the required column `total_qty` to the `office_actual` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `office_actual` ADD COLUMN `total_qty` VARCHAR(191) NOT NULL;

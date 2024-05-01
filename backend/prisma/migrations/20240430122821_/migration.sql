/*
  Warnings:

  - A unique constraint covering the columns `[actualDetailID]` on the table `actualDetail` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `actualDetailID` to the `actualDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `actualDetail` ADD COLUMN `actualDetailID` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `actualDetail_actualDetailID_key` ON `actualDetail`(`actualDetailID`);

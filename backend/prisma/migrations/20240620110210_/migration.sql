/*
  Warnings:

  - You are about to drop the column `projectID` on the `office_master` table. All the data in the column will be lost.
  - You are about to drop the `office_detail` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[project_office_ID]` on the table `office_master` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `project_office_ID` to the `office_master` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `office_master_projectID_key` ON `office_master`;

-- AlterTable
ALTER TABLE `office_master` DROP COLUMN `projectID`,
    ADD COLUMN `project_office_ID` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `office_detail`;

-- CreateTable
CREATE TABLE `project_office_ID` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `projectID` VARCHAR(191) NOT NULL,
    `detail` VARCHAR(191) NOT NULL,
    `qty` VARCHAR(191) NOT NULL,
    `remain` VARCHAR(191) NOT NULL,
    `remark` VARCHAR(191) NOT NULL,
    `month` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `office_master_project_office_ID_key` ON `office_master`(`project_office_ID`);

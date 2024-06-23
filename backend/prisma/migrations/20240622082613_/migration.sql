/*
  Warnings:

  - You are about to drop the `office_detail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `office_detail`;

-- CreateTable
CREATE TABLE `office_actual` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_office_ID` VARCHAR(191) NOT NULL,
    `detail` VARCHAR(191) NOT NULL,
    `qty` VARCHAR(191) NOT NULL,
    `remain` VARCHAR(191) NOT NULL,
    `remark` VARCHAR(191) NOT NULL,
    `month` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

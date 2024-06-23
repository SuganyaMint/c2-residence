-- DropIndex
DROP INDEX `loginHistory_userName_key` ON `loginHistory`;

-- AlterTable
ALTER TABLE `actualDetail` MODIFY `actualValue` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `project` MODIFY `budget` VARCHAR(191) NOT NULL,
    MODIFY `totalActual` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `office_master` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `projectID` VARCHAR(191) NOT NULL,
    `projectName` VARCHAR(191) NOT NULL,
    `detail` VARCHAR(191) NOT NULL,
    `total_qty` VARCHAR(191) NOT NULL,
    `qty` VARCHAR(191) NOT NULL,
    `remark` VARCHAR(191) NOT NULL,
    `month` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `office_master_projectID_key`(`projectID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `office_detail` (
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

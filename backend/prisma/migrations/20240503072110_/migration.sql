-- CreateTable
CREATE TABLE `userTable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `surname` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `userTable_userName_key`(`userName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `loginHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(191) NOT NULL,
    `loginDate` VARCHAR(191) NOT NULL,
    `logoutDate` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `loginHistory_userName_key`(`userName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `projectID` VARCHAR(191) NOT NULL,
    `projectName` VARCHAR(191) NOT NULL,
    `budget` INTEGER NOT NULL,
    `totalActual` INTEGER NOT NULL,
    `remark` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL,
    `area` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `project_projectID_key`(`projectID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `actualDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `actualDetailID` VARCHAR(191) NOT NULL,
    `projectID` VARCHAR(191) NOT NULL,
    `actualValue` INTEGER NOT NULL,
    `actualType` VARCHAR(191) NOT NULL,
    `remark` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `actualDetail_actualDetailID_key`(`actualDetailID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `office_project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_office_ID` VARCHAR(191) NOT NULL,
    `projectName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `office_project_project_office_ID_key`(`project_office_ID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

/*
  Warnings:

  - You are about to drop the column `projectID` on the `project_office_ID` table. All the data in the column will be lost.
  - Added the required column `project_office_ID` to the `project_office_ID` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `project_office_ID` DROP COLUMN `projectID`,
    ADD COLUMN `project_office_ID` VARCHAR(191) NOT NULL;

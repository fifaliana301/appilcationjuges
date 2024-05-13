/*
  Warnings:

  - Added the required column `type` to the `Validations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user` to the `Validations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Competitors` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Judges` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Users` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Validations` ADD COLUMN `type` VARCHAR(191) NOT NULL,
    ADD COLUMN `user` VARCHAR(191) NOT NULL;

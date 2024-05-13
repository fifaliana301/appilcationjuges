/*
  Warnings:

  - You are about to drop the column `user` on the `Validations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Competitors` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Judges` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Users` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Validations` DROP COLUMN `user`;

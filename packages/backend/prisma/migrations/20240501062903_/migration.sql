-- AlterTable
ALTER TABLE `Competitors` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Judges` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Users` ALTER COLUMN `updatedAt` DROP DEFAULT;

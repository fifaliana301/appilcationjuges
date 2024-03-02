-- AlterTable
ALTER TABLE `Admins` MODIFY `role` ENUM('USER', 'SUPER_ADMIN', 'ADMIN') NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE `Competitors` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Judges` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Users` ALTER COLUMN `updatedAt` DROP DEFAULT;

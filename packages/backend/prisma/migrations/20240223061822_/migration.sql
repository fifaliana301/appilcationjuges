-- AlterTable
ALTER TABLE `Competitors` ADD COLUMN `table_name` VARCHAR(191) NOT NULL DEFAULT 'Competitors',
    ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Judges` ADD COLUMN `table_name` VARCHAR(191) NOT NULL DEFAULT 'Judges',
    ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Users` ADD COLUMN `table_name` VARCHAR(191) NOT NULL DEFAULT 'Users',
    ALTER COLUMN `updatedAt` DROP DEFAULT;

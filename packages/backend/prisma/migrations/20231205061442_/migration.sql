/*
  Warnings:

  - You are about to drop the column `competitionsId` on the `CalendarsBattles` table. All the data in the column will be lost.
  - Added the required column `tablesId` to the `CalendarsBattles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `CalendarsBattles` DROP FOREIGN KEY `CalendarsBattles_competitionsId_fkey`;

-- AlterTable
ALTER TABLE `CalendarsBattles` DROP COLUMN `competitionsId`,
    ADD COLUMN `tablesId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Tables` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `competitionsId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tables_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tables` ADD CONSTRAINT `Tables_competitionsId_fkey` FOREIGN KEY (`competitionsId`) REFERENCES `Competitions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CalendarsBattles` ADD CONSTRAINT `CalendarsBattles_tablesId_fkey` FOREIGN KEY (`tablesId`) REFERENCES `Tables`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

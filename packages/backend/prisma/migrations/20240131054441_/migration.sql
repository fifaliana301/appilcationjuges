/*
  Warnings:

  - You are about to drop the column `password` on the `Dancers` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Teams` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Competitors` ADD COLUMN `password` VARCHAR(191) NOT NULL DEFAULT 'password';

-- AlterTable
ALTER TABLE `Dancers` DROP COLUMN `password`;

-- AlterTable
ALTER TABLE `Teams` DROP COLUMN `password`;

/*
  Warnings:

  - You are about to drop the `_CompetitionsToJudges` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_CompetitionsToJudges` DROP FOREIGN KEY `_CompetitionsToJudges_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CompetitionsToJudges` DROP FOREIGN KEY `_CompetitionsToJudges_B_fkey`;

-- DropTable
DROP TABLE `_CompetitionsToJudges`;

-- CreateTable
CREATE TABLE `InvitedJudges` (
    `id` VARCHAR(191) NOT NULL,
    `judgesId` VARCHAR(191) NULL,
    `competitionsId` VARCHAR(191) NOT NULL,
    `accept` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `InvitedJudges` ADD CONSTRAINT `InvitedJudges_judgesId_fkey` FOREIGN KEY (`judgesId`) REFERENCES `Judges`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `InvitedJudges` ADD CONSTRAINT `InvitedJudges_competitionsId_fkey` FOREIGN KEY (`competitionsId`) REFERENCES `Competitions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - The primary key for the `InvitedJudges` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `InvitedJudges` table. All the data in the column will be lost.
  - Made the column `judgesId` on table `InvitedJudges` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `InvitedJudges` DROP FOREIGN KEY `InvitedJudges_judgesId_fkey`;

-- AlterTable
ALTER TABLE `InvitedJudges` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `judgesId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`judgesId`, `competitionsId`);

-- AddForeignKey
ALTER TABLE `InvitedJudges` ADD CONSTRAINT `InvitedJudges_judgesId_fkey` FOREIGN KEY (`judgesId`) REFERENCES `Judges`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

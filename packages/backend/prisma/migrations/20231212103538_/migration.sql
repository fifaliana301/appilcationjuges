-- CreateTable
CREATE TABLE `_CompetitionsToJudges` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CompetitionsToJudges_AB_unique`(`A`, `B`),
    INDEX `_CompetitionsToJudges_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CompetitionsToJudges` ADD CONSTRAINT `_CompetitionsToJudges_A_fkey` FOREIGN KEY (`A`) REFERENCES `Competitions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CompetitionsToJudges` ADD CONSTRAINT `_CompetitionsToJudges_B_fkey` FOREIGN KEY (`B`) REFERENCES `Judges`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

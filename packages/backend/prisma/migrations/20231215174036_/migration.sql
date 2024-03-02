-- CreateTable
CREATE TABLE `_CompetitionsToCompetitors` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CompetitionsToCompetitors_AB_unique`(`A`, `B`),
    INDEX `_CompetitionsToCompetitors_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CompetitionsToCompetitors` ADD CONSTRAINT `_CompetitionsToCompetitors_A_fkey` FOREIGN KEY (`A`) REFERENCES `Competitions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CompetitionsToCompetitors` ADD CONSTRAINT `_CompetitionsToCompetitors_B_fkey` FOREIGN KEY (`B`) REFERENCES `Competitors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

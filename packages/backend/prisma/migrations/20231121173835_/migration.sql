-- CreateTable
CREATE TABLE `Users` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admins` (
    `id` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `usersId` VARCHAR(191) NULL,

    UNIQUE INDEX `Admins_usersId_key`(`usersId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Actions` (
    `id` VARCHAR(191) NOT NULL,
    `execution` DOUBLE NOT NULL DEFAULT 0.00,
    `form` DOUBLE NOT NULL DEFAULT 0.00,
    `confidence` DOUBLE NOT NULL DEFAULT 0.00,
    `spontaneity` DOUBLE NOT NULL DEFAULT 0.00,
    `technique` DOUBLE NOT NULL DEFAULT 0.00,
    `variete` DOUBLE NOT NULL DEFAULT 0.00,
    `performativity` DOUBLE NOT NULL DEFAULT 0.00,
    `musicality` DOUBLE NOT NULL DEFAULT 0.00,
    `creativity` DOUBLE NOT NULL DEFAULT 0.00,
    `personality` DOUBLE NOT NULL DEFAULT 0.00,
    `repeat` DOUBLE NOT NULL DEFAULT 0.00,
    `beat` DOUBLE NOT NULL DEFAULT 0.00,
    `crash` DOUBLE NOT NULL DEFAULT 0.00,
    `misbehavior` DOUBLE NOT NULL DEFAULT 0.00,
    `latestAction` VARCHAR(191) NOT NULL,
    `roundsId` VARCHAR(191) NULL,
    `competitorsId` VARCHAR(191) NULL,
    `judgesId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Judges` (
    `id` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `specialty` VARCHAR(191) NOT NULL,
    `history` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Judges_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CalendarsBattles` (
    `id` VARCHAR(191) NOT NULL,
    `dates` DATETIME(3) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `competitionsId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rounds` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `start_time` DATETIME(3) NOT NULL,
    `end_time` DATETIME(3) NOT NULL,
    `calendarsBattlesId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Photos` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `profile` BOOLEAN NOT NULL,
    `competitorsId` VARCHAR(191) NULL,
    `usersId` VARCHAR(191) NULL,
    `judgesId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Videos` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `competitorsId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Competitions` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `dates` DATETIME(3) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `rules` VARCHAR(191) NOT NULL,
    `adminsId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Competitors` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Competitors_name_key`(`name`),
    UNIQUE INDEX `Competitors_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dancers` (
    `id` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `date_berth` DATETIME(3) NOT NULL,
    `biography` VARCHAR(191) NOT NULL,
    `competitorsId` VARCHAR(191) NULL,

    UNIQUE INDEX `Dancers_competitorsId_key`(`competitorsId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Teams` (
    `id` VARCHAR(191) NOT NULL,
    `biography` VARCHAR(191) NOT NULL,
    `competitorsId` VARCHAR(191) NULL,

    UNIQUE INDEX `Teams_competitorsId_key`(`competitorsId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CalendarsBattlesToCompetitors` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CalendarsBattlesToCompetitors_AB_unique`(`A`, `B`),
    INDEX `_CalendarsBattlesToCompetitors_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CalendarsBattlesToJudges` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CalendarsBattlesToJudges_AB_unique`(`A`, `B`),
    INDEX `_CalendarsBattlesToJudges_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DancersToTeams` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_DancersToTeams_AB_unique`(`A`, `B`),
    INDEX `_DancersToTeams_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Admins` ADD CONSTRAINT `Admins_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Actions` ADD CONSTRAINT `Actions_roundsId_fkey` FOREIGN KEY (`roundsId`) REFERENCES `Rounds`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Actions` ADD CONSTRAINT `Actions_competitorsId_fkey` FOREIGN KEY (`competitorsId`) REFERENCES `Competitors`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `Actions` ADD CONSTRAINT `Actions_judgesId_fkey` FOREIGN KEY (`judgesId`) REFERENCES `Judges`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `CalendarsBattles` ADD CONSTRAINT `CalendarsBattles_competitionsId_fkey` FOREIGN KEY (`competitionsId`) REFERENCES `Competitions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rounds` ADD CONSTRAINT `Rounds_calendarsBattlesId_fkey` FOREIGN KEY (`calendarsBattlesId`) REFERENCES `CalendarsBattles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Photos` ADD CONSTRAINT `Photos_competitorsId_fkey` FOREIGN KEY (`competitorsId`) REFERENCES `Competitors`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `Photos` ADD CONSTRAINT `Photos_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `Photos` ADD CONSTRAINT `Photos_judgesId_fkey` FOREIGN KEY (`judgesId`) REFERENCES `Judges`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `Videos` ADD CONSTRAINT `Videos_competitorsId_fkey` FOREIGN KEY (`competitorsId`) REFERENCES `Competitors`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `Competitions` ADD CONSTRAINT `Competitions_adminsId_fkey` FOREIGN KEY (`adminsId`) REFERENCES `Admins`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dancers` ADD CONSTRAINT `Dancers_competitorsId_fkey` FOREIGN KEY (`competitorsId`) REFERENCES `Competitors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Teams` ADD CONSTRAINT `Teams_competitorsId_fkey` FOREIGN KEY (`competitorsId`) REFERENCES `Competitors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CalendarsBattlesToCompetitors` ADD CONSTRAINT `_CalendarsBattlesToCompetitors_A_fkey` FOREIGN KEY (`A`) REFERENCES `CalendarsBattles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CalendarsBattlesToCompetitors` ADD CONSTRAINT `_CalendarsBattlesToCompetitors_B_fkey` FOREIGN KEY (`B`) REFERENCES `Competitors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CalendarsBattlesToJudges` ADD CONSTRAINT `_CalendarsBattlesToJudges_A_fkey` FOREIGN KEY (`A`) REFERENCES `CalendarsBattles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CalendarsBattlesToJudges` ADD CONSTRAINT `_CalendarsBattlesToJudges_B_fkey` FOREIGN KEY (`B`) REFERENCES `Judges`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DancersToTeams` ADD CONSTRAINT `_DancersToTeams_A_fkey` FOREIGN KEY (`A`) REFERENCES `Dancers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DancersToTeams` ADD CONSTRAINT `_DancersToTeams_B_fkey` FOREIGN KEY (`B`) REFERENCES `Teams`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[login]` on the table `Judges` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Judges_login_key` ON `Judges`(`login`);

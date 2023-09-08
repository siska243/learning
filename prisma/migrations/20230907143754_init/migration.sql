/*
  Warnings:

  - You are about to drop the column `hours` on the `training` table. All the data in the column will be lost.
  - You are about to drop the column `training_category_id` on the `training` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endAt` to the `Training` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelId` to the `Training` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startAt` to the `Training` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `training` DROP FOREIGN KEY `Training_training_category_id_fkey`;

-- AlterTable
ALTER TABLE `role` MODIFY `title` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `training` DROP COLUMN `hours`,
    DROP COLUMN `training_category_id`,
    ADD COLUMN `endAt` DATETIME(3) NOT NULL,
    ADD COLUMN `hoursPerDay` VARCHAR(10) NULL,
    ADD COLUMN `levelId` INTEGER NOT NULL,
    ADD COLUMN `numberDay` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `startAt` DATETIME(3) NOT NULL,
    MODIFY `required` JSON NULL,
    MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `trainingcategory` MODIFY `title` VARCHAR(255) NOT NULL,
    MODIFY `slug` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `email` VARCHAR(255) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL,
    MODIFY `first_name` VARCHAR(255) NOT NULL,
    MODIFY `last_name` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `SubTrainingCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT false,
    `trainingCategoryId` INTEGER NOT NULL,

    INDEX `SubTrainingCategory_trainingCategoryId_idx`(`trainingCategoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubCategoryOnTraining` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `trainingId` INTEGER NOT NULL,
    `subTrainingCategoryId` INTEGER NOT NULL,

    INDEX `SubCategoryOnTraining_trainingId_subTrainingCategoryId_idx`(`trainingId`, `subTrainingCategoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Level` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `class` VARCHAR(25) NULL,
    `color` VARCHAR(20) NULL,
    `icon` VARCHAR(20) NULL,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `files` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `trainingId` INTEGER NOT NULL,
    `levelId` INTEGER NOT NULL,
    `isPublish` BOOLEAN NOT NULL DEFAULT false,
    `isArchived` BOOLEAN NOT NULL DEFAULT false,
    `isAchivedAt` DATETIME(3) NULL,
    `isPublishAt` DATETIME(3) NULL,

    UNIQUE INDEX `Course_slug_key`(`slug`),
    INDEX `Course_trainingId_levelId_idx`(`trainingId`, `levelId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlanningCourse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `courseId` INTEGER NOT NULL,
    `startAt` DATETIME(3) NULL,
    `endAt` DATETIME(3) NULL,

    INDEX `PlanningCourse_courseId_idx`(`courseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quiz` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quiz` TEXT NOT NULL,
    `multipleChoices` BOOLEAN NOT NULL DEFAULT false,
    `isPublish` BOOLEAN NOT NULL DEFAULT false,
    `answers` JSON NOT NULL,
    `trainingId` INTEGER NOT NULL,
    `isPublishAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `required` BOOLEAN NOT NULL DEFAULT false,

    INDEX `Quiz_trainingId_idx`(`trainingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnswerQuizStudent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quizId` INTEGER NOT NULL,
    `answers` TEXT NOT NULL,
    `isValide` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `student_id` INTEGER NOT NULL,

    INDEX `AnswerQuizStudent_student_id_quizId_idx`(`student_id`, `quizId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Training_levelId_trainer_id_idx` ON `Training`(`levelId`, `trainer_id`);

-- CreateIndex
CREATE UNIQUE INDEX `User_slug_key` ON `User`(`slug`);

-- AddForeignKey
ALTER TABLE `Training` ADD CONSTRAINT `Training_levelId_fkey` FOREIGN KEY (`levelId`) REFERENCES `Level`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubTrainingCategory` ADD CONSTRAINT `SubTrainingCategory_trainingCategoryId_fkey` FOREIGN KEY (`trainingCategoryId`) REFERENCES `TrainingCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubCategoryOnTraining` ADD CONSTRAINT `SubCategoryOnTraining_trainingId_fkey` FOREIGN KEY (`trainingId`) REFERENCES `Training`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubCategoryOnTraining` ADD CONSTRAINT `SubCategoryOnTraining_subTrainingCategoryId_fkey` FOREIGN KEY (`subTrainingCategoryId`) REFERENCES `SubTrainingCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_trainingId_fkey` FOREIGN KEY (`trainingId`) REFERENCES `Trainer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_levelId_fkey` FOREIGN KEY (`levelId`) REFERENCES `Level`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlanningCourse` ADD CONSTRAINT `PlanningCourse_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_trainingId_fkey` FOREIGN KEY (`trainingId`) REFERENCES `Training`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnswerQuizStudent` ADD CONSTRAINT `AnswerQuizStudent_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `Quiz`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnswerQuizStudent` ADD CONSTRAINT `AnswerQuizStudent_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

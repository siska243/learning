/*
  Warnings:

  - Added the required column `roles` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `role` ADD COLUMN `roles` JSON NOT NULL;

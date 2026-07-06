/*
  Warnings:

  - You are about to drop the column `end_date` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `task` table. All the data in the column will be lost.
  - Added the required column `end_date` to the `RecurrenceRule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `RecurrenceRule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `recurrencerule` ADD COLUMN `end_date` DATE NOT NULL,
    ADD COLUMN `start_date` DATE NOT NULL;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `end_date`,
    DROP COLUMN `start_date`;

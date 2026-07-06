/*
  Warnings:

  - You are about to drop the column `creation_date` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `recurrence_rule` on the `task` table. All the data in the column will be lost.
  - Added the required column `end_time` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recurrence_rule_id` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `task` DROP COLUMN `creation_date`,
    DROP COLUMN `recurrence_rule`,
    ADD COLUMN `end_time` TIME NOT NULL,
    ADD COLUMN `recurrence_rule_id` INTEGER NOT NULL,
    ADD COLUMN `start_date` DATE NOT NULL,
    ADD COLUMN `start_time` TIME NOT NULL;

-- CreateTable
CREATE TABLE `RecurrenceRule` (
    `recurrence_rule_id` INTEGER NOT NULL AUTO_INCREMENT,
    `recurrence_pattern` VARCHAR(1000) NOT NULL,

    PRIMARY KEY (`recurrence_rule_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_recurrence_rule_id_fkey` FOREIGN KEY (`recurrence_rule_id`) REFERENCES `RecurrenceRule`(`recurrence_rule_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `recurrencerule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sitecontent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tasktype` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_recurrence_rule_id_fkey`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_task_type_id_fkey`;

-- DropIndex
DROP INDEX `Task_recurrence_rule_id_fkey` ON `task`;

-- DropIndex
DROP INDEX `Task_task_type_id_fkey` ON `task`;

-- DropTable
DROP TABLE `recurrencerule`;

-- DropTable
DROP TABLE `sitecontent`;

-- DropTable
DROP TABLE `tasktype`;

-- CreateTable
CREATE TABLE `Task_Type` (
    `task_type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `task_type_name` VARCHAR(225) NULL,
    `type_desc` VARCHAR(225) NULL,

    PRIMARY KEY (`task_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recurrence_Rule` (
    `recurrence_rule_id` INTEGER NOT NULL AUTO_INCREMENT,
    `recurrence_pattern` VARCHAR(1000) NOT NULL,
    `end_date` DATE NOT NULL,
    `start_date` DATE NOT NULL,

    PRIMARY KEY (`recurrence_rule_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Site_Content` (
    `content_id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(2000) NOT NULL,
    `news_author` VARCHAR(225) NOT NULL,
    `news_date` DATE NOT NULL,
    `page_type` ENUM('MAIN_PAGE', 'NEWS', 'ABOUT_US') NOT NULL,
    `language` ENUM('ENGLISH', 'PORTUGUESE') NOT NULL,

    PRIMARY KEY (`content_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_task_type_id_fkey` FOREIGN KEY (`task_type_id`) REFERENCES `Task_Type`(`task_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_recurrence_rule_id_fkey` FOREIGN KEY (`recurrence_rule_id`) REFERENCES `Recurrence_Rule`(`recurrence_rule_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

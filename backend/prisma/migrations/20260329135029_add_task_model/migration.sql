/*
  Warnings:

  - You are about to drop the column `recurrence_task_id` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `task` DROP COLUMN `recurrence_task_id`;

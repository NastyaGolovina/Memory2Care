-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_recurrence_rule_id_fkey`;

-- DropIndex
DROP INDEX `Task_recurrence_rule_id_fkey` ON `task`;

-- AlterTable
ALTER TABLE `task` MODIFY `recurrence_rule_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_recurrence_rule_id_fkey` FOREIGN KEY (`recurrence_rule_id`) REFERENCES `Recurrence_Rule`(`recurrence_rule_id`) ON DELETE SET NULL ON UPDATE CASCADE;

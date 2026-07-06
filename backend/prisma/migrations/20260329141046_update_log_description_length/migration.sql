-- AlterTable
ALTER TABLE `caregiver` MODIFY `address` VARCHAR(255) NOT NULL,
    MODIFY `name` VARCHAR(50) NOT NULL,
    MODIFY `phone` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `log` MODIFY `log_description` VARCHAR(2000) NULL,
    MODIFY `login` VARCHAR(225) NULL;

-- AlterTable
ALTER TABLE `patient_caregiver` MODIFY `anon_name` VARCHAR(225) NOT NULL;

-- AlterTable
ALTER TABLE `sitecontent` MODIFY `news_author` VARCHAR(225) NOT NULL;

-- AlterTable
ALTER TABLE `task` MODIFY `task_description` VARCHAR(225) NOT NULL;

-- AlterTable
ALTER TABLE `tasktype` MODIFY `task_type_name` VARCHAR(225) NULL,
    MODIFY `type_desc` VARCHAR(225) NULL;

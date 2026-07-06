-- AlterTable
ALTER TABLE `caregiver` MODIFY `approved_date_time` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `patient` MODIFY `address` VARCHAR(1000) NOT NULL,
    MODIFY `phone` VARCHAR(1000) NOT NULL,
    MODIFY `patient_code` VARCHAR(1000) NOT NULL,
    MODIFY `diagnosis` VARCHAR(1000) NOT NULL,
    MODIFY `birth_date` VARCHAR(1000) NOT NULL,
    MODIFY `name` VARCHAR(1000) NOT NULL;

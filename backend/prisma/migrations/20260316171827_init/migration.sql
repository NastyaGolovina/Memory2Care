-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('ADMIN', 'PATIENT', 'CAREGIVER') NOT NULL DEFAULT 'PATIENT',
    `created_date_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Patient` (
    `patient_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `address` CHAR(225) NOT NULL,
    `phone` CHAR(50) NOT NULL,
    `patient_code` CHAR(50) NOT NULL,
    `diagnosis` CHAR(225) NOT NULL,
    `birth_date` DATE NOT NULL,
    `name` CHAR(50) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`patient_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Caregiver` (
    `caregiver_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `address` CHAR(255) NOT NULL,
    `name` CHAR(50) NOT NULL,
    `phone` CHAR(255) NOT NULL,
    `approved` BOOLEAN NOT NULL DEFAULT false,
    `approved_date_time` DATETIME(3) NOT NULL,

    PRIMARY KEY (`caregiver_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Patient_Caregiver` (
    `pc_id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_id` INTEGER NOT NULL,
    `caregiver_id` INTEGER NOT NULL,
    `relationship` ENUM('FAMILY_MEMBER', 'INFORMAL_CARETAKER', 'MEDICAL_CARETAKER') NOT NULL,
    `support_level` ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL,
    `approx_age` INTEGER NOT NULL,
    `anon_name` CHAR(225) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `assignment_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`pc_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TaskType` (
    `task_type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `task_type_name` CHAR(225) NULL,
    `type_desc` CHAR(225) NULL,

    PRIMARY KEY (`task_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Task` (
    `task_id` INTEGER NOT NULL AUTO_INCREMENT,
    `pc_id` INTEGER NOT NULL,
    `task_type_id` INTEGER NOT NULL,
    `recurrence_task_id` VARCHAR(191) NOT NULL,
    `task_description` CHAR(225) NOT NULL,
    `execution_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `creation_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `is_recurring` BOOLEAN NOT NULL,
    `recurrence_rule` CHAR(225) NULL,
    `is_completed` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`task_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Log` (
    `log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `log_datetime` DATETIME(3) NOT NULL,
    `log_description` CHAR(225) NULL,
    `login` CHAR(225) NULL,

    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SiteContent` (
    `content_id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(2000) NOT NULL,
    `news_author` CHAR(225) NOT NULL,
    `news_date` DATE NOT NULL,
    `page_type` ENUM('MAIN_PAGE', 'NEWS', 'ABOUT_US') NOT NULL,
    `language` ENUM('ENGLISH', 'PORTUGUESE') NOT NULL,

    PRIMARY KEY (`content_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Patient` ADD CONSTRAINT `Patient_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Caregiver` ADD CONSTRAINT `Caregiver_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Patient_Caregiver` ADD CONSTRAINT `Patient_Caregiver_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `Patient`(`patient_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Patient_Caregiver` ADD CONSTRAINT `Patient_Caregiver_caregiver_id_fkey` FOREIGN KEY (`caregiver_id`) REFERENCES `Caregiver`(`caregiver_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_pc_id_fkey` FOREIGN KEY (`pc_id`) REFERENCES `Patient_Caregiver`(`pc_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_task_type_id_fkey` FOREIGN KEY (`task_type_id`) REFERENCES `TaskType`(`task_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

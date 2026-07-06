/*
  Warnings:

  - You are about to alter the column `language` on the `site_content` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(4))` to `VarChar(225)`.

*/
-- AlterTable
ALTER TABLE `site_content` MODIFY `page_type` ENUM('MAIN_PAGE', 'ABOUT_US', 'TEAM_PARTNERS', 'NEWS', 'CONTACT', 'ACCOUNT') NOT NULL,
    MODIFY `language` VARCHAR(225) NOT NULL;

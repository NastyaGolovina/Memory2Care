/*
  Warnings:

  - Added the required column `element_id` to the `Site_Content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `site_content` ADD COLUMN `element_id` VARCHAR(225) NOT NULL;

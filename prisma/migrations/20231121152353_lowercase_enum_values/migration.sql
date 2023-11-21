/*
 Warnings:
 - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
 */

-- AlterTable

ALTER TABLE "User"
ALTER COLUMN "role"
SET DEFAULT 'user' :: TEXT,
ALTER COLUMN
    "role" TYPE TEXT USING "role" :: TEXT,
ALTER COLUMN "role"
SET NOT NULL;

UPDATE "User" SET role = 'user' WHERE role = 'USER';

UPDATE "User" SET role = 'superadmin' WHERE role = 'SUPERADMIN';

UPDATE "User" SET role = 'datamanager' WHERE role = 'DATAMANAGER';

-- DropEnum

DROP TYPE "Role";
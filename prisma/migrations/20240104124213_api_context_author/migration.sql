/*
  Warnings:

  - Added the required column `authoredById` to the `ApiMetadata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApiMetadata" ADD COLUMN     "authoredById" INTEGER NULL;
UPDATE "ApiMetadata" SET "authoredById" = 1;
ALTER TABLE "ApiMetadata" ALTER COLUMN "authoredById" SET NOT NULL;

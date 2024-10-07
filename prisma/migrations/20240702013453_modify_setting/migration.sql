/*
  Warnings:

  - You are about to drop the column `value` on the `Setting` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Setting" DROP COLUMN "value",
ADD COLUMN     "floatValue" DOUBLE PRECISION,
ADD COLUMN     "intValue" INTEGER,
ADD COLUMN     "stringValue" TEXT;

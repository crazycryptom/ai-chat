/*
  Warnings:

  - You are about to drop the column `floatValue` on the `Setting` table. All the data in the column will be lost.
  - You are about to drop the column `intValue` on the `Setting` table. All the data in the column will be lost.
  - You are about to drop the column `stringValue` on the `Setting` table. All the data in the column will be lost.
  - You are about to drop the `Model` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `value` to the `Setting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Setting" DROP COLUMN "floatValue",
DROP COLUMN "intValue",
DROP COLUMN "stringValue",
ADD COLUMN     "value" JSONB NOT NULL;

-- DropTable
DROP TABLE "Model";

/*
  Warnings:

  - You are about to drop the column `name` on the `CheckinRule` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,eventId]` on the table `Checkin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `checkinRuleId` to the `Checkin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `CheckinRule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CheckinRuleType" AS ENUM ('QR_CODE', 'DOCUMENTO', 'LISTA_IMPRESSA', 'CONFIRMACAO_EMAIL');

-- AlterTable
ALTER TABLE "Checkin" ADD COLUMN     "checkinRuleId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CheckinRule" DROP COLUMN "name",
ADD COLUMN     "type" "CheckinRuleType" NOT NULL;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Checkin_userId_eventId_key" ON "Checkin"("userId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Checkin" ADD CONSTRAINT "Checkin_checkinRuleId_fkey" FOREIGN KEY ("checkinRuleId") REFERENCES "CheckinRule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

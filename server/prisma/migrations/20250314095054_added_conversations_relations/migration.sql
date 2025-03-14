/*
  Warnings:

  - You are about to drop the column `conversationsId` on the `Messages` table. All the data in the column will be lost.
  - Added the required column `conversationId` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Messages" DROP COLUMN "conversationsId",
ADD COLUMN     "conversationId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Messages_conversationId_idx" ON "Messages"("conversationId");

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "ClassChatMessages" (
    "id" SERIAL NOT NULL,
    "sender" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "class" TEXT NOT NULL,

    CONSTRAINT "ClassChatMessages_pkey" PRIMARY KEY ("id")
);

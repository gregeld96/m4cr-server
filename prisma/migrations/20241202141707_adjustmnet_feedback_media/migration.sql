/*
  Warnings:

  - You are about to drop the column `images` on the `feedback_forms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "feedback_forms" DROP COLUMN "images",
ADD COLUMN     "is_read" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "feedback_form_medias" (
    "id" SERIAL NOT NULL,
    "follower_id" INTEGER NOT NULL,
    "mediaId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "feedback_form_medias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "feedback_form_medias_id_idx" ON "feedback_form_medias"("id");

-- AddForeignKey
ALTER TABLE "feedback_form_medias" ADD CONSTRAINT "feedback_form_medias_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "feedback_forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_form_medias" ADD CONSTRAINT "feedback_form_medias_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "media_files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

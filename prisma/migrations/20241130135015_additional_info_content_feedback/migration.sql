/*
  Warnings:

  - Added the required column `title` to the `contents` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "contents" DROP CONSTRAINT "contents_thumbnail_id_fkey";

-- AlterTable
ALTER TABLE "contents" ADD COLUMN     "body_html" TEXT,
ADD COLUMN     "excerpt" TEXT,
ADD COLUMN     "link" TEXT,
ADD COLUMN     "seo_desc_en" TEXT,
ADD COLUMN     "seo_desc_id" TEXT,
ADD COLUMN     "seo_title_en" TEXT,
ADD COLUMN     "seo_title_id" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "thumbnail_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "feedback_forms" ADD COLUMN     "city" TEXT,
ADD COLUMN     "district" TEXT,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "link" TEXT,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "province" TEXT,
ADD COLUMN     "urban" TEXT;

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_thumbnail_id_fkey" FOREIGN KEY ("thumbnail_id") REFERENCES "media_files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

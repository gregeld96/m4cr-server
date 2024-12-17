-- CreateTable
CREATE TABLE "follower_contents" (
    "id" SERIAL NOT NULL,
    "type" TEXT,
    "title" TEXT NOT NULL,
    "excerpt" TEXT,
    "body" TEXT,
    "body_html" TEXT,
    "link" TEXT,
    "status" TEXT NOT NULL DEFAULT 'In Review',
    "thumbnail_id" INTEGER,
    "author_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "follower_contents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "follower_content_categories" (
    "id" SERIAL NOT NULL,
    "contentId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "follower_content_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "follower_content_tags" (
    "id" SERIAL NOT NULL,
    "contentId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "follower_content_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "follower_content_media" (
    "id" SERIAL NOT NULL,
    "contentId" INTEGER NOT NULL,
    "mediaId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "follower_content_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content_analytics" (
    "id" SERIAL NOT NULL,
    "contentId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "content_analytics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "follower_contents" ADD CONSTRAINT "follower_contents_thumbnail_id_fkey" FOREIGN KEY ("thumbnail_id") REFERENCES "media_files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follower_contents" ADD CONSTRAINT "follower_contents_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "followers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follower_content_categories" ADD CONSTRAINT "follower_content_categories_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "follower_contents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follower_content_categories" ADD CONSTRAINT "follower_content_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follower_content_tags" ADD CONSTRAINT "follower_content_tags_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "follower_contents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follower_content_tags" ADD CONSTRAINT "follower_content_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follower_content_media" ADD CONSTRAINT "follower_content_media_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "follower_contents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follower_content_media" ADD CONSTRAINT "follower_content_media_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "media_files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_analytics" ADD CONSTRAINT "content_analytics_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "contents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

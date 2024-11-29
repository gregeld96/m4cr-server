-- CreateTable
CREATE TABLE "followers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT,
    "profile_photo_id" INTEGER,
    "phone" TEXT,
    "social_media" TEXT,
    "social_link" TEXT,
    "reference" TEXT,
    "subscribe_news" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "followers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback_forms" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "follower_id" TEXT,
    "images" TEXT,
    "title" TEXT,
    "content" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "feedback_forms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "followers_email_key" ON "followers"("email");

-- CreateIndex
CREATE INDEX "followers_email_id_idx" ON "followers"("email", "id");

-- CreateIndex
CREATE INDEX "feedback_forms_id_idx" ON "feedback_forms"("id");

-- AddForeignKey
ALTER TABLE "followers" ADD CONSTRAINT "followers_profile_photo_id_fkey" FOREIGN KEY ("profile_photo_id") REFERENCES "media_files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_forms" ADD CONSTRAINT "feedback_forms_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "followers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

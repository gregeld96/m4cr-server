-- CreateTable
CREATE TABLE "conservation_statuses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'location',
    "description" TEXT,
    "color" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "conservation_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "species" (
    "id" SERIAL NOT NULL,
    "common_name" TEXT NOT NULL,
    "scientific_name" TEXT NOT NULL,
    "description" TEXT,
    "image_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "species_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "biodiversities" (
    "id" SERIAL NOT NULL,
    "common_name" TEXT NOT NULL,
    "scientific_name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "image_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "biodiversities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mangrove_specieses" (
    "id" SERIAL NOT NULL,
    "species_id" INTEGER NOT NULL,
    "location_id" INTEGER NOT NULL,
    "status" TEXT,
    "year" INTEGER,
    "total_population" INTEGER,
    "conservationId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "mangrove_specieses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mangrove_biodiversities" (
    "id" SERIAL NOT NULL,
    "bio_id" INTEGER NOT NULL,
    "location_id" INTEGER NOT NULL,
    "status" TEXT,
    "year" INTEGER,
    "total_population" INTEGER,
    "conservation_id" INTEGER NOT NULL,

    CONSTRAINT "mangrove_biodiversities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mangrove_locations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "area" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "province" TEXT,
    "city" TEXT,
    "district" TEXT,
    "urban" TEXT NOT NULL,
    "conservation_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "mangrove_locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "human_activity_images" (
    "id" SERIAL NOT NULL,
    "activity_id" INTEGER NOT NULL,
    "image_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "human_activity_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "human_activities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "location_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "human_activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ntfp_images" (
    "id" SERIAL NOT NULL,
    "ntfp_id" INTEGER NOT NULL,
    "image_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "ntfp_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ntfp" (
    "id" SERIAL NOT NULL,
    "local_name" TEXT NOT NULL,
    "scientific_name" TEXT NOT NULL,
    "type" TEXT,
    "commodity_type" TEXT,
    "product" TEXT NOT NULL,
    "description" TEXT,
    "location_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "ntfp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mangrove_boundaries" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "geometry" TEXT NOT NULL,
    "location_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "mangrove_boundaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mangrove_panolense" (
    "id" SERIAL NOT NULL,
    "position_number" INTEGER NOT NULL,
    "position_link" TEXT NOT NULL,
    "image_id" INTEGER NOT NULL,
    "location_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "mangrove_panolense_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "species" ADD CONSTRAINT "species_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "media_files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "biodiversities" ADD CONSTRAINT "biodiversities_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "media_files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mangrove_specieses" ADD CONSTRAINT "mangrove_specieses_species_id_fkey" FOREIGN KEY ("species_id") REFERENCES "species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mangrove_specieses" ADD CONSTRAINT "mangrove_specieses_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "mangrove_locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mangrove_specieses" ADD CONSTRAINT "mangrove_specieses_conservationId_fkey" FOREIGN KEY ("conservationId") REFERENCES "conservation_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mangrove_biodiversities" ADD CONSTRAINT "mangrove_biodiversities_bio_id_fkey" FOREIGN KEY ("bio_id") REFERENCES "biodiversities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mangrove_biodiversities" ADD CONSTRAINT "mangrove_biodiversities_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "mangrove_locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mangrove_biodiversities" ADD CONSTRAINT "mangrove_biodiversities_conservation_id_fkey" FOREIGN KEY ("conservation_id") REFERENCES "conservation_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mangrove_locations" ADD CONSTRAINT "mangrove_locations_conservation_id_fkey" FOREIGN KEY ("conservation_id") REFERENCES "conservation_statuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "human_activity_images" ADD CONSTRAINT "human_activity_images_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "human_activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "human_activity_images" ADD CONSTRAINT "human_activity_images_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "media_files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "human_activities" ADD CONSTRAINT "human_activities_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "mangrove_locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ntfp_images" ADD CONSTRAINT "ntfp_images_ntfp_id_fkey" FOREIGN KEY ("ntfp_id") REFERENCES "ntfp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ntfp_images" ADD CONSTRAINT "ntfp_images_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "media_files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ntfp" ADD CONSTRAINT "ntfp_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "mangrove_locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mangrove_panolense" ADD CONSTRAINT "mangrove_panolense_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "media_files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mangrove_panolense" ADD CONSTRAINT "mangrove_panolense_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "mangrove_locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

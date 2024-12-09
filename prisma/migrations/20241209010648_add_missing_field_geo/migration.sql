/*
  Warnings:

  - A unique constraint covering the columns `[location_id]` on the table `mangrove_boundaries` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "mangrove_biodiversities" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "mangrove_boundaries_location_id_key" ON "mangrove_boundaries"("location_id");

-- AddForeignKey
ALTER TABLE "mangrove_boundaries" ADD CONSTRAINT "mangrove_boundaries_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "mangrove_locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

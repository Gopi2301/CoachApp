/*
  Warnings:

  - You are about to drop the column `password_hash` on the `users` table. All the data in the column will be lost.
  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ATHLETE', 'COACH', 'ADMIN');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "password_hash",
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ATHLETE';

-- CreateTable
CREATE TABLE "strava_accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "athlete_id" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "expires_at" INTEGER NOT NULL,
    "profile_url" TEXT,
    "username" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "strava_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "strava_accounts_user_id_key" ON "strava_accounts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "strava_accounts_athlete_id_key" ON "strava_accounts"("athlete_id");

-- AddForeignKey
ALTER TABLE "strava_accounts" ADD CONSTRAINT "strava_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `Workspace` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `app` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `step_no` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Apps" AS ENUM ('http', 'schedule', 'webhook');

-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('action', 'trigger');

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_workspace_id_fkey";

-- DropForeignKey
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_owner_id_fkey";

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "app" "Apps" NOT NULL,
ADD COLUMN     "step_no" INTEGER NOT NULL,
ADD COLUMN     "type" "JobType" NOT NULL;

-- DropTable
DROP TABLE "Workspace";

-- CreateTable
CREATE TABLE "Workflow" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "owner_id" TEXT NOT NULL,
    "job_count" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workflow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Workflow" ADD CONSTRAINT "Workflow_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "Workflow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "public"."Titles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT NOT NULL,
    "canBeUndercover" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Titles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RelatedTitles" (
    "id" TEXT NOT NULL,
    "titleId" TEXT NOT NULL,
    "relatedTitleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RelatedTitles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Managers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLogin" TIMESTAMP(3),

    CONSTRAINT "Managers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Titles_name_key" ON "public"."Titles"("name");

-- CreateIndex
CREATE INDEX "RelatedTitles_titleId_idx" ON "public"."RelatedTitles"("titleId");

-- CreateIndex
CREATE INDEX "RelatedTitles_relatedTitleId_idx" ON "public"."RelatedTitles"("relatedTitleId");

-- CreateIndex
CREATE UNIQUE INDEX "Managers_name_key" ON "public"."Managers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Managers_email_key" ON "public"."Managers"("email");

-- AddForeignKey
ALTER TABLE "public"."RelatedTitles" ADD CONSTRAINT "RelatedTitles_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "public"."Titles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RelatedTitles" ADD CONSTRAINT "RelatedTitles_relatedTitleId_fkey" FOREIGN KEY ("relatedTitleId") REFERENCES "public"."Titles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

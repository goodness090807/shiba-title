import { prisma } from "@/libs/prisma";
import { SpyGameTitle } from "@/types/titles";
import { NextResponse } from "next/server";

export const GET = async () => {
  // 直接用原生 SQL 一次性取得隨機題目和相關題目
  const result = await prisma.$queryRaw`
    WITH random_title AS (
      SELECT t.* 
      FROM "Titles" t
      WHERE "canBeUndercover" = true
      ORDER BY RANDOM()
      LIMIT 1
    ),
    random_related AS (
      SELECT rt.*, related_t.name as related_name, related_t.image as related_image
      FROM "RelatedTitles" rt
      JOIN "Titles" related_t ON rt."relatedTitleId" = related_t.id
      JOIN random_title ON rt."titleId" = random_title.id
      ORDER BY RANDOM()
      LIMIT 1
    )
    SELECT 
      rt.name as title,
      rt.image as image,
      rr.related_name as "undercoverTitle",
      rr.related_image as "undercoverImage"
    FROM random_title rt
    LEFT JOIN random_related rr ON true
  `;

  const [resultItem] = result as {
    title: string;
    image: string;
    undercoverTitle: string;
    undercoverImage: string;
  }[];

  if (!resultItem) {
    return NextResponse.json(null);
  }

  const cloudinaryBasePath = process.env.CLOUDINARY_BASE_PATH || "";

  return NextResponse.json<SpyGameTitle>({
    title: resultItem.title,
    titleImg: cloudinaryBasePath + resultItem.image,
    undercoverTitle: resultItem.undercoverTitle,
    undercoverTitleImg: cloudinaryBasePath + resultItem.undercoverImage,
  });
};

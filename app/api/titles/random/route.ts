import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  // 取得目前題目最大數量
  const totalCount = await prisma.titles.count();
  // 產生隨機數字
  const randomNumber = Math.floor(Math.random() * totalCount);
  // 根據隨機數字取得題目
  const title = await prisma.titles.findFirst({
    skip: randomNumber,
    take: 1,
    orderBy: {
      id: "asc",
    },
  });

  if (!title) {
    return NextResponse.json(null);
  }

  return NextResponse.json({
    name: title.name,
    image: process.env.CLOUDINARY_BASE_PATH + title.image,
  });
};

import { prisma } from "@/libs/prisma";
import { getSession } from "@/libs/session";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { titleId, relatedTitleId } = await request.json();

  if (!titleId || !relatedTitleId) {
    return NextResponse.json({ message: "titleId 和 relatedTitleId 是必填的" }, { status: 400 });
  }

  if (titleId === relatedTitleId) {
    return NextResponse.json({ message: "titleId 和 relatedTitleId 不能相同" }, { status: 400 });
  }

  // 檢查是否已經存在相同的關聯
  const existingRelation = await prisma.relatedTitles.findFirst({
    where: {
      titleId,
      relatedTitleId,
    },
  });

  if (existingRelation) {
    return NextResponse.json({ message: "已經存在相同的關聯" }, { status: 400 });
  }

  // 開啟transaction，確保雙向關聯的一致性
  await prisma.$transaction([
    prisma.relatedTitles.create({
      data: {
        titleId,
        relatedTitleId,
      },
    }),
    prisma.relatedTitles.create({
      data: {
        titleId: relatedTitleId,
        relatedTitleId: titleId,
      },
    }),
    prisma.titles.update({
      where: { id: titleId },
      data: {
        canBeUndercover: true,
      },
    }),
    prisma.titles.update({
      where: { id: relatedTitleId },
      data: {
        canBeUndercover: true,
      },
    }),
  ]);

  return NextResponse.json({ message: "成功" }, { status: 200 });
};

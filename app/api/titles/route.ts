import { prisma } from "@/libs/prisma";
import { getSession } from "@/libs/session";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,

  api_key: process.env.CLOUDINARY_API_KEY,

  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (request: NextRequest) => {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 取得前端FormData傳送的 image 檔案
  const formData = await request.formData();
  const image = formData.get("image") as File;

  // image 是必填的
  if (!image || !(image instanceof File)) {
    return NextResponse.json({ message: "image 是必填的" }, { status: 400 });
  }

  // 取得檔名(包含副檔名)
  const filename = image.name;

  if (!filename) {
    return NextResponse.json({ message: "無效的圖片網址" }, { status: 400 });
  }

  // 檢查是否已經存在相同的圖片
  const existingTitle = await prisma.titles.findFirst({
    where: { image: filename },
  });

  if (existingTitle) {
    return NextResponse.json({ message: "相同的題目已經存在" }, { status: 400 });
  }

  // 上傳圖片到 Cloudinary
  try {
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await cloudinary.uploader.upload(`data:${image.type};base64,${buffer.toString("base64")}`, {
      public_id: filename.split(".")[0],
      folder: "shiba-title",
    });
  } catch (error) {
    return NextResponse.json({ message: "上傳失敗", error }, { status: 500 });
  }

  // 將圖片資訊存入資料庫
  await prisma.titles.create({
    data: {
      name: filename.split(".")[0],
      image: filename,
    },
  });

  return NextResponse.json(
    { message: "上傳成功" },
    {
      status: 201,
    }
  );
};

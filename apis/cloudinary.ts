"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getResources = async () => {
  const result = await cloudinary.api.resources({
    type: "upload",
    prefix: "images/game-noun-generation-assistant",
  });

  return result.resources;
};

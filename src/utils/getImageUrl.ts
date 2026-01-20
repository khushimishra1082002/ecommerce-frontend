import conf from "../config/Conf";

export const getImageUrl = (image?: string | string[]) => {
  if (!image) return "/default-avatar.png";

  // If image is an array, take the first image
  const imagePath = Array.isArray(image) ? image[0] : image;

  if (typeof imagePath !== "string") {
    return "/default-avatar.png";
  }

  if (imagePath.startsWith("http")) return imagePath;

  return `${conf.BaseURL}/${conf.imageUploadUrl}/${imagePath}`;
};

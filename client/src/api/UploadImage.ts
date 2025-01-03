import { Cloudinary } from "@cloudinary/url-gen/index";
import { CLOUD_NAME, CLOUDINARY_URL } from "./key";
// Configure Cloudinary
const cloudinary = new Cloudinary({
  cloud: {
    cloudName: CLOUD_NAME, // Thay bằng cloud name của bạn
  },
});
export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "preset1");

  const res = await fetch(CLOUDINARY_URL, {
    method: "POST",
    body: formData,
  });
  return await res.json();
}

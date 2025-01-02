import { Cloudinary } from "@cloudinary/url-gen/index";

// Configure Cloudinary
const cloudinary = new Cloudinary({
  cloud: {
    cloudName: "dfoq1dvce", // Thay bằng cloud name của bạn
  },
});
export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "preset1");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dfoq1dvce/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );
  return await res.json();
}

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: import.meta.cloud_name,
  api_key: import.meta.api_key,
  api_secret: import.meta.api_secret, // Click 'View API Keys' above to copy your API secret
});

export default cloudinary;

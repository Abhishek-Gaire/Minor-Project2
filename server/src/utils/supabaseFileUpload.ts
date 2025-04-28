import dotenv from "dotenv";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";
import supabase from "../config/supabase";

dotenv.config();

const bucketName = process.env.BUCKET_NAME as string;

const uploadToSupabase = async (
  file: Express.Multer.File,
  fileFolder: string
): Promise<{ publicUrl: string | null; error: Error | null }> => {
  try {
    const fileExtension = path.extname(file.originalname);
    const fileName = `${uuidv4()}${fileExtension}`;
    const filePath = `${fileFolder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        cacheControl: "3600",
        upsert: false, // ❗ Avoid overwriting if same path exists
      });

    if (uploadError) {
      return { publicUrl: null, error: uploadError };
    }

    const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);

    return { publicUrl: data.publicUrl, error: null };
  } catch (err) {
    return { publicUrl: null, error: err as Error };
  }
};

export default uploadToSupabase;

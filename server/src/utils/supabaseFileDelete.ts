import dotenv from "dotenv";
import supabase from "../config/supabase";

dotenv.config();

const bucketName = process.env.BUCKET_NAME as string;

// If fileUrl is a complete Supabase public URL
const extractPathFromSupabaseUrl = (url: string): string => {
  // Pattern to match: anything after /public/BUCKET_NAME/
  const regex = new RegExp(`/public/${bucketName}/(.+)`);
  const match = url.match(regex);

  if (match && match[1]) {
    return match[1];
  }

  // Fallback if regex doesn't match
  console.warn("Could not extract path from URL:", url);
  return url.split("/").slice(-2).join("/");
};

// Then in your code

/**
 * Deletes a file from Supabase storage
 * @param filePath The path of the file to delete within the bucket
 * @returns Object with success status and any error
 */
const deleteFromSupabase = async (
  fileUrl: string
): Promise<{ success: boolean; error: Error | null }> => {
  try {
    const filePath = extractPathFromSupabaseUrl(fileUrl);
    // Ensure the file path is properly formatted
    const cleanFilePath = filePath.startsWith("/")
      ? filePath.substring(1)
      : filePath;

    // Delete the file from the storage bucket
    const { error: deleteError } = await supabase.storage
      .from(bucketName)
      .remove([cleanFilePath]);

    if (deleteError) {
      return { success: false, error: deleteError };
    }

    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: err as Error };
  }
};

export default deleteFromSupabase;

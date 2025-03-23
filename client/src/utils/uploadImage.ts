import { supabase } from "../lib/supabase";

const uploadImage = async (file: File) => {
  const { data, error } = await supabase.storage
    .from("schoolImages")
    .upload(`${file.name}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading image:", error);
    return { data: null, error };
  }

  return { data, error: null };
};

export default uploadImage;

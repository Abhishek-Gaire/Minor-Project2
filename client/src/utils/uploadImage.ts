import { supabase } from "../lib/supabase";
import { v4 as uuidv4 } from "uuid";

const uploadImage = async (file: File) => {
  const fileName = `${uuidv4()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("minor2storage")
    .upload(`schoolImages/${fileName}`, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("Error uploading image:", error);
    return { data: null, error };
  }

  return { data, error: null };
};

export default uploadImage;

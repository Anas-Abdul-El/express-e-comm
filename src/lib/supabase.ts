import { createClient } from "@supabase/supabase-js";

// Create Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.ACCESS_KEY!,
);

// types of args
interface UploadFile {
  file: string;
  contentType: string;
  folder: string;
}

// Upload file using standard upload
const uploadFile = async ({ file, contentType, folder }: UploadFile) => {
  const { data, error } = await supabase.storage
    .from("e-comm")
    .upload(folder, file, {
      contentType,
    });
  if (error) {
    console.log(error);
  }

  return data?.path;
};

export default uploadFile;

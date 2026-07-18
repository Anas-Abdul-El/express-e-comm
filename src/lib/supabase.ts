import { createClient } from "@supabase/supabase-js";

// Create Supabase client
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// types of args
interface UploadFile {
  file: Buffer;
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

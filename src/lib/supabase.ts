//
// supabase.ts
//
// This file configures the Supabase client for file storage operations in the application.
// It provides functions for uploading files to Supabase storage buckets.
//

import { createClient } from "@supabase/supabase-js";

/**
 * supabase is the configured Supabase client instance for storage operations.
 * It uses environment variables for the Supabase URL and service role key.
 */
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

interface UploadFile {
  file: Buffer;
  contentType: string;
  folder: string;
}

/**
 * uploadFile uploads a file to the Supabase storage bucket.
 * @param file - The file buffer containing the file data.
 * @param contentType - The MIME type of the file.
 * @param folder - The folder path in the storage bucket where the file will be stored.
 * @returns A promise that resolves to the path of the uploaded file in the storage bucket.
 */
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

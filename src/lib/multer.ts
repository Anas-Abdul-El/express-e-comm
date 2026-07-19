//
// multer.ts
//
// This file configures Multer middleware for handling file uploads in the application.
// It sets up memory storage with a 5MB file size limit for handling image uploads.
//

import multer from "multer";

/**
 * upload is a configured Multer instance for handling file uploads.
 * It uses memory storage to store files in memory and limits file size to 5MB.
 */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;

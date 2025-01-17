import multer from "multer";

// Set up multer storage (optional: customize storage path and file naming).
const storage = multer.memoryStorage(); // Stores the file in memory as a Buffer.
const upload = multer({ storage });

// Middleware to parse 'multipart/form-data'
export const uploadMiddleware = upload.single("profilePic"); // The key 'profilePic' must match the form-data key.

import multer from "multer";

// Memory storage configuration
const storage = multer.memoryStorage();

// Middleware for single file upload
const singleUpload = multer({ storage }).single("file");

// General upload middleware for multiple use cases
const upload = multer({ storage });

export { singleUpload, upload };
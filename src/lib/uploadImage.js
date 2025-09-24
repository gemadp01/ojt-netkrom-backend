import multer from "multer";
import fs from "fs";
import path from "path";

// Tentukan folder upload
const uploadDir = path.join(process.cwd(), "public/uploads");

// Set tempat penyimpanan file
const storage = multer.diskStorage({
  // destination for files
  destination: (req, file, cb) => {
    // Cek folder ada atau belum
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // recursive biar auto bikin nested folder
    }
    cb(null, "public/uploads"); // folder tujuan
  },

  // add back the extension
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // contoh: 1693308391.png
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExt = [".jpg", ".jpeg", ".png"];

  if (allowedExt.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Hanya file JPG, JPEG dan PNG yang diperbolehkan!"), false);
  }
};

// upload parameters for multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // maksimal 1MB
  fileFilter,
});

export default upload;

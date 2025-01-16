const multer = require("multer");

// Define storage (in memory for direct S3 upload)
const storage = multer.memoryStorage();

// File filter (optional)
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file type'), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
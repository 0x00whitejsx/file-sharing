const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle file upload
app.post('/upload', upload.single('material'), (req, res) => {
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ fileUrl });
});

// Serve uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

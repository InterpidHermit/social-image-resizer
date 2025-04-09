const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const cors = require('cors');

const app = express();
app.use(cors());

// Handle image upload and resizing
const upload = multer({ storage: multer.memoryStorage() });

app.post('/resize', upload.single('image'), async (req, res) => {
  try {
    const { width, height, format, quality } = req.body;
    const image = await sharp(req.file.buffer)
      .resize(Number(width), Number(height))
      .toFormat(format, { quality: Number(quality) })
      .toBuffer();

    res.set('Content-Type', `image/${format}`);
    res.send(image);
  } catch (error) {
    res.status(500).send('Error processing image');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

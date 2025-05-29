import nextConnect from 'next-connect';
import multer from 'multer';
import { connectDb } from '../../../lib/db';
import { Restaurant } from '../../../models/Restaurant';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() });
const handler = nextConnect();

handler.get(async (req, res) => {
  await connectDb();
  const data = await Restaurant.find();
  res.json(data);
});

handler.post(upload.single('image'), async (req, res) => {
  await connectDb();
  const { name, description } = req.body;
  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: 'berlin-food' }, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    stream.end(req.file.buffer);
  });
  const restaurant = await Restaurant.create({ name, description, image: result.secure_url });
  res.json(restaurant);
});

export default handler;

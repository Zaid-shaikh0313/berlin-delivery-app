import nc from 'next-connect';
import { connectDb } from '../../../../lib/db';
import { Restaurant } from '../../../../models/Restaurant';
const handler = nc();

handler.get(async (req, res) => {
  await connectDb();
  const rest = await Restaurant.findById(req.query.id).lean();
  res.json(rest?.menu || []);
});

handler.post(async (req, res) => {
  // expects { name, description, price } in JSON
  await connectDb();
  const { name, description, price } = req.body;
  const rest = await Restaurant.findById(req.query.id);
  rest.menu.push({ name, description, price });
  await rest.save();
  res.status(201).json(rest.menu);
});

export default handler;

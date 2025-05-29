import { connectDb } from '../../../lib/db';
import { Restaurant } from '../../../models/Restaurant';

export default async function handler(req, res) {
  await connectDb();
  if (req.method === 'DELETE') {
    await Restaurant.findByIdAndDelete(req.query.id);
    return res.status(204).end();
  }
  res.status(405).end();
}

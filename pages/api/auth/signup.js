import { hash } from 'bcryptjs';
import { connectToDatabase } from '../../../services/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      res.status(422).json({ message: 'Invalid Data', success: false });
      return;
    }

    const { db } = await connectToDatabase();

    const checkExisting = await db.collection('users').findOne({ email });
    if (checkExisting) {
      res.status(422).json({ message: 'User already exists', success: false });
      return;
    }

    await db.collection('users').insertOne({
      email,
      password: await hash(password, 12),
      name,
      last_name: '',
      location: '',
    });

    res.status(201).json({ message: 'User Created' });
  } else {
    res.status(500).json({ message: 'Route not valid' });
  }
}

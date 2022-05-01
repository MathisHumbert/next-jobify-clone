import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../services/mongodb';

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    const { email, name, last_name, location, id } = req.body;

    if (!email || !name || !last_name || !location) {
      res.status(422).json({ message: 'Invalid Data', success: false });
      return;
    }

    const query = { _id: ObjectId(id) };
    const update = {
      $set: {
        email,
        name,
        last_name,
        location,
      },
    };
    const options = { returnNewDocument: true };

    const { db } = await connectToDatabase();

    const updatedUser = await db
      .collection('users')
      .findOneAndUpdate(query, update, options);

    res.status(201).json(updatedUser);
  } else {
    res.status(500).json({ message: 'Route not valid' });
  }
}

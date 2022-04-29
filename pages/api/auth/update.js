import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../services/mongodb';

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    console.log(req.body);
    const { email, name, last_name, location, id } = req.body;

    if (!email || !name || !last_name || !location) {
      res.status(422).json({ message: 'Invalid Data', success: false });
      return;
    }

    const { db } = await connectToDatabase();

    const updatedUser = db
      .collection('users')
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { ...req.body },
        { returnNewDocument: true }
      );

    console.log(updatedUser);

    res.status(201).json(updatedUser);
  } else {
    res.status(500).json({ message: 'Route not valid' });
  }
}

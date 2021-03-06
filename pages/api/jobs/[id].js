import { ObjectId, Timestamp } from 'mongodb';
import { connectToDatabase } from '../../../services/mongodb';

export default async function handler(req, res) {
  const { method, query, body } = req;
  const { db } = await connectToDatabase();

  if (method === 'DELETE') {
    const { userId, id } = query;

    const job = await db
      .collection('jobs')
      .findOne({ userId: ObjectId(userId), _id: ObjectId(id) });
    if (!job) {
      res.status(422).json({ message: 'No job found' });
      return;
    }

    await db.collection('jobs').findOneAndDelete({ _id: ObjectId(id) });

    res.status(200).json({ message: 'Job was deleted' });
  }
  if (method === 'PATCH') {
    const { userId, id } = query;
    const { position, company, job_location, status, job_type } = body;

    const job = await db
      .collection('jobs')
      .findOne({ userId: ObjectId(userId), _id: ObjectId(id) });
    if (!job) {
      res.status(422).json({ message: 'No job found' });
      return;
    }

    const queryOpts = { _id: ObjectId(id) };
    const update = {
      $set: {
        position,
        company,
        job_location,
        status,
        job_type,
      },
    };

    await db.collection('jobs').findOneAndUpdate(queryOpts, update);

    res.status(200).json({ message: 'Job was edited' });
  }
}

import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../services/mongodb';

export default async function handler(req, res) {
  const { method, query, body } = req;

  const { db } = await connectToDatabase();

  if (method === 'POST') {
    const { position, company, job_location, status, job_type, id } = body;

    if (!position || !company || !job_location || !status || !job_type) {
      res.status(422).json({ message: 'Invalid Data', success: false });
      return;
    }

    const checkExisting = await db
      .collection('users')
      .findOne({ _id: ObjectId(id) });
    if (!checkExisting) {
      res.status(422).json({ message: "User doesn't exist", success: false });
      return;
    }

    await db.collection('jobs').insertOne({
      position,
      company,
      job_location,
      status,
      job_location,
      userId: ObjectId(id),
    });

    res.status(200).json({ message: 'Job added to collection' });
  }
  if (method === 'GET') {
    // const { position, status, type, sort } = body;
    console.log('query', query);

    // const customBody = {};
    // !!position && (customBody.position = position);
    // status !== 'all' && (customBody.status = status);
    // type !== 'all' && (customBody.type = type);

    // console.log('customBody', customBody);

    // const jobs = await db.collection('jobs').find.
    res.status(200).json({ message: 'Job added to collection' });
  }
}

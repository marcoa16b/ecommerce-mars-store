import connectMongo from '../../../lib/mongodb';
import User from '../../../models/userSchema';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function signUp(req, res) {
  try {
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    const user = await User.create(req.body);
    console.log('CREATED DOCUMENT');

    res.json({ user });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}

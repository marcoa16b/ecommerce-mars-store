import connectMongo from '../../../lib/mongodb';
import User from '../../../models/userSchema';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
 export default async function signIn(req, res) {
  try {
    await connectMongo();
    // console.log('CONNECTED TO MONGO');

    const users = await User.find(req.body);
    // console.log('CREATED DOCUMENT');

    res.json({ users });

  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}

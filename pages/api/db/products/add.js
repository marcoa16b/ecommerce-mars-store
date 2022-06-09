import connectMongo from '../../../../lib/mongodb';
import Prod from '../../../../models/ProductSchema';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
 export default async function signIn(req, res) {
   console.log("intentando conectar con Mongo");
  try {
    await connectMongo();
    console.log("conectado con Mongo");
    const product = await Prod.create(req.body);
    res.json({ product });
  } catch (error) {
    console.log('Hubo un error con la base de datos => ',error);
    res.json({ error });
  }
}
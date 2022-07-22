/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
 export default async function getCategories(req, res) {
  try {
    const resp = await fetch('https://api.printful.com/categories', {
      mode: 'no-cors',
      headers: {
        'authorization': 'Bearer ' + process.env.API_KEY_PRINTFUL,
      }
    });
    let data = await resp.json();

    res.json(data);

  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
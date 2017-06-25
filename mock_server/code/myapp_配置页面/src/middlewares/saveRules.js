import { indexPage } from '../config';

/* eslint no-param-reassign: 0 */
export default async(req, res) => {

  const method = req.method.toUpperCase();
  const body = req.body;

  res.status(200).send({status: "succeed!"});

  console.log(body, "body")
};



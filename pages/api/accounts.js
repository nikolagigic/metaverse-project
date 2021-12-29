import nextConnect from 'next-connect';

import middleware from '../../middleware';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {

    let doc = await req.db.collection('accounts_collection').findOne()

    console.log(doc);

    res.json(doc);

});

export default handler;
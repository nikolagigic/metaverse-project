import dbConnect from '../../utils/dbConnect';
import Account from '../../models/Account'

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch(method) {
        case 'GET':
            try {
                const accounts = await Account.find({})

                res.status(200).json({success: true, data: accounts})
            } catch (error) {
                res.status(400).json({success: false, error: error.message})
            }
            break;
        
        case 'POST':
            try {
                const account = await Account.create(req.body);

                res.status(201).json({success: true, data: account})
            } catch (error) {
                res.status(400).json({success: false, error: error.message})
            }
            break;
        
        default:
            res.status(400)
            break;
    }
}
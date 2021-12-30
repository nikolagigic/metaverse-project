import dbConnect from '../../../utils/dbConnect';
import Account from '../../../models/Account'

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch(method) {
        case 'GET':
            try {
                const accounts = await Account.find({})

                return res.status(200).json({success: true, data: accounts})
            } catch (error) {
                return res.status(400).json({success: false, error: error.message})
            }
        
        case 'POST':
            try {
                console.log('>>> req.body: ', req.body)
                const account = await Account.create(req.body);

                return res.status(201).json({success: true, data: account})
            } catch (error) {
                return res.status(400).json({success: false, error: error.message})
            }
        
        default:
            return res.status(400).json({ success: false })
    }
}
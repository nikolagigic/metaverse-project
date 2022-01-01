import dbConnect from "../../../utils/dbConnect";
import Account from "../../../models/Account";

dbConnect();

export default async (req, res) => {
  const {
    query: { address },
    method,
  } = req;

  const queryAddress = address;

  switch (method) {
    case "GET":
      try {
        const account = await Account.find({ address: queryAddress });

        if (account.length > 0)
          return res.status(200).json({ success: true, data: account[0] });
        else
          return res
            .status(200)
            .json({ success: false, data: "Account does not exist." });
      } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
      }

    case "PUT":
      try {
        const { address, ...queryParams } = req.body;

        const account = await Account.findOneAndUpdate(
          { address: queryAddress },
          { ...queryParams }
        );

        console.log(">>> account: ", account);

        if (account)
          return res.status(200).json({ success: true, data: account });
        else
          return res
            .status(404)
            .json({ success: false, data: "Account does not exist." });
      } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, error: error.message });
      }

    case "DELETE":
      try {
        const deletedAccount = await Account.deleteOne({
          address: queryAddress,
        });

        if (deletedAccount)
          return res.status(200).json({ success: true, data: deletedAccount });
        else
          return res
            .status(404)
            .json({ success: false, data: "Account does not exist." });
      } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
      }

    default:
      return res.status(400).json({ success: false });
  }
};

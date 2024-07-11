import { UserBll } from "../../bll/UserBll"

exports.delete = async (req, res) => { 
    try {
        const result = await new UserBll().deleteUser(req.query._id);
        if (result) {
            return res.status(200).json({"message": "User deleted successfully"});
        }
    } catch (e) {
       return res.status(400).json({"message": "error occured"});
    }
}
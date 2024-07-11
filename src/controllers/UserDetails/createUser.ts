import { UserBll } from "../../bll/UserBll";

exports.post = async (req, res) => {
    try {
        const user = await new UserBll().createUser(req);
        res.status(200).json({"message": "success"});
    } catch (err) {
        res.status(500).json(err);
    }
}
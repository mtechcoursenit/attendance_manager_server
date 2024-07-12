import { getManager } from "../../../config/connection";
import { UserBll } from "../../bll/UserBll";

exports.post = async (req, res) => {
    try {
        const body = req.body;
        const data = await new UserBll().userLogin(body);
        if (data) {
            res.status(200).json({
                "message": "Login Successful",
                data
        }); 
        } else {
            res.status(404).json({
                "message": "Incorrect Credentials"
            })
        }
    } catch (error) {
        res.status(400).send(error);
    }
}
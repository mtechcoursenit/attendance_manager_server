import { getManager } from "../../../config/connection";
import { URLBll } from "../../bll/URLBll";

exports.post = async (req, res) => {
    try {
        const body = req.body;
        const data = await new URLBll().userLogin(body);
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
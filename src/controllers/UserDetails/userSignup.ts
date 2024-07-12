import { UserBll } from "../../bll/UserBll";

exports.post = async (req, res) => {
    try {
        const body = req.body;
        const data = await new UserBll().userSignup(body);
        if (data) {
            res.status(200).json(data); 
        } else {
            res.status(404).json({
                "message": "No record found"
            })
        }
    } catch (error) {
        res.status(400).send(error);
    }
}
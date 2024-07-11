import { URLBll } from "../../bll/URLBll"

exports.get = async (req, res) => {
    try {
        const id = req.query.id;
        const result = await new URLBll().getAnalytics(id);
        if(! result) {
            res.status(400).json({"message": "No Record Found"});
        } 
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
}
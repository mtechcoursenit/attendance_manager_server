import { SubjectsBll } from "../../bll/SubjectBll"

exports.post = async (req, res) => {
    try {
        const result = await new SubjectsBll().sendMail();
        if(result) {
            res.status(200).json(result.envelope);
        } else {
            res.json(result);
        }
        
    } catch (err) {
        res.status(500).json(err);
    }
}
import { SubjectsBll } from "../../bll/SubjectBll"

exports.post = async (req, res) => {
    try {
        const result = await new SubjectsBll().updateAttendance(req.body.subjectName, req.body.userId, req.body.presentAttendance, req.body.absentAttendance);
        if(result) {
            res.status(200).json(result);
        }
    } catch(err) {
        res.status(500).json(err)
    }
}
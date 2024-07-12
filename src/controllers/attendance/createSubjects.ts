import { SubjectsBll } from "../../bll/SubjectBll";

exports.post = async (req, res) => {
    try {
        const subject = await new SubjectsBll().createNewSubject(req.body.subjectName, req.body.userId, 0);
        if (subject) {
            res.status(200).json(subject);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}
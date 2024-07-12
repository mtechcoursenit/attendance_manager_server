import { SubjectsBll } from "../../bll/SubjectBll"

exports.delete = async (req, res) => {
    try {
        const result = await new SubjectsBll().deleteSubject(req.body.subjectName, req.body.userId);
        if (result) {
            res.status(200).json({ message: "Subject deleted successfully" });
        }
    } catch (err) {
        res.status(500).json(err);
}
}
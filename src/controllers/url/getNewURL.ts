import { URLBll } from "../../bll/URLBll";


exports.post = async (req, res) => {
    try {
        const originalURL = req.body;
        const result = await new URLBll().createNewURL(originalURL.url);
        if(result){
            return res.status(201).json(result);
        }
    } catch (error) {
        return res.status(400).json({"message": error});
    }
}
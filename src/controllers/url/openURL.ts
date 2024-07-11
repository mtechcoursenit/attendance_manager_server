import {exec} from 'child_process';
import { URLBll } from "../../bll/URLBll";

exports.get = async (req, res) => {
    try {
        const id = req.query.id;
        const result = await new URLBll().getURLById(id); 
        if(result) {
            res.redirect(result.url);
        }
    } catch (err) {
        res.status(500).send(err);
    }
}
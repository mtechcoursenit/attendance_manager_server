import { UserBll } from "../bll/UserBll";
import * as jwt from 'jsonwebtoken';

export const isloggedIn = () => {
    const token = UserBll.cache.get('token');
    if (!token) return false;
    const data = jwt.verify(token, process.env.secretKey);
    if (data) return true;
    return false;
}
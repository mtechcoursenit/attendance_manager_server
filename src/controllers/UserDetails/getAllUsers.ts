import { UserBll } from '../../bll/UserBll';

exports.get = async (req, res) => {
    try {
        const users = await new UserBll().getAllUsers(req);
        if (users.length) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: 'No users found' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}
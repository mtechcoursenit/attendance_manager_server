import {getManager} from '../../config/connection';
import {ObjectID} from 'mongodb';

export class UserBll {

    public async createUser(req: any) {
        try {
            const Users = await getManager().collection('users').find({}).toArray();
            const id = `00${Users.length+1}`;
            const data = {...req.body,id};
            return  await getManager().collection('users').insertOne(data);
        } catch (err) {
            console.log(err);
        }
    }

    public async getAllUsers(req) {
        if (req.query.id) {
            return await getManager().collection('users').find({"id" : req.query.id}).toArray();
        } else {
            return await getManager().collection('users').find({}).toArray();
        }
    }

    public async deleteUser(id) {
        try {
            return await getManager().collection('users').deleteOne( {"_id" : ObjectID(id)} );
        } catch (err) { 
            console.log(err);
        }
    }

    public async userSignup(body: any) {
        try {
            const result =  await getManager().collection('users').insertOne(body);
            const data = await new UserBll().getData(result.insertedId, 'users');
            if (!data) {
                return {};
            } 
            return data;
        } catch (err) {
            throw new Error(err);
            
        }
    }

    public async getData(id, table) {
        try {
            return await getManager().collection(table).findOne({_id : id})
        } catch (error) {
            throw new Error(error);
        }

    }

    public async userLogin(body: any) {
        try {
            const [result] =  await getManager().collection('users').find({'email': body.email}).toArray();
            if(result.password === body.password) {
                return result;;
            } else {
                return false;
            }
        } catch (err) {
            throw new Error(err);
            
        }
    }
}
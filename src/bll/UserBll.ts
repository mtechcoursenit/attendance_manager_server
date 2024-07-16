import {getManager} from '../../config/connection';
import {ObjectID} from 'mongodb';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import NodeCache = require('node-cache');

dotenv.config();
export class UserBll {

    static cache = new NodeCache(); 
    public async createUser(req: any) {
        try {
            const Users = await getManager().collection('users').find({}).toArray();
            const id = `00${Users.length+1}`;
            const token = this.generateToken({email: req.body.email, id: id}, process.env.secretKey);
            const data = {...req.body,id,token};
            const result =  await getManager().collection('users').insertOne(data);
            if(result.insertedCount) {
                UserBll.cache.set('token',token,5*60*100000);
                return data;
            }
        } catch (err) {
            console.log(err);
        }
    }
    generateToken(arg0: { email: any; id: string; }, secretKey: string) {
        try {
            const token = jwt.sign(arg0, secretKey);
            return token
        } catch (err) {
            return err.message;
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
                if ( this.isValidToken(result) ){
                    UserBll.cache.set('token',result.token,5*60*100000);
                    return result.token;
                }
                const token = this.generateToken({email: result.email, id: result.id}, process.env.secretKey);
                await getManager().collection('users').updateOne({_id: ObjectID(result._id)}, {$set : {token:token}});
                UserBll.cache.set('token',result.token,5*60*100000);
                return token;
            } else {
                return false;
            }
        } catch (err) {
            throw new Error(err);
            
        }
    }

    public isValidToken(data) {
        const result = jwt.verify(data.token, process.env.secretKey);
        if (!result) return false;
        return true;
    }
}
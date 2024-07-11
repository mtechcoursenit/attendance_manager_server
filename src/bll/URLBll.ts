import { getConnection, ObjectId  } from "mongodb";
import { getManager } from "../../config/connection";
const generateShortId = require('ssid');

export class URLBll {
    public async userSignup(body: any) {
        try {
            const result =  await getManager().collection('users').insertOne(body);
            const data = await new URLBll().getData(result.insertedId, 'users');
            if (!data) {
                return {};
            } 
            return data;
        } catch (err) {
            throw new Error(err);
            
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

    public async createNewURL(originalURL: string) {
        try {
            const shortId = generateShortId();
            const data = {
                "url": originalURL,
                "id": shortId,
                "visit": 0
            }
            const response = await getManager().collection('url').insertOne(data);
            const result = await this.getData(response.insertedId, 'url');
            return `Your Short URL :-  https://urlshortner-server-zkbf.onrender.com/url/openURL/?id=${result.id}`
        } catch (e) {
            throw new Error(e);
        }
    }

    public async getData(id, table) {
        try {
            return await getManager().collection(table).findOne({_id : id})
        } catch (error) {
            throw new Error(error);
        }

    }

    public async getURLById(id: string) {
        try {
            const [data] = await getManager().collection('url').find({ "id": id }).toArray();
            const { _id , ...updateObj} = data;
            updateObj.visit = (updateObj.visit || 0) + 1;
            await getManager().collection('url').updateOne({ _id: new ObjectId(_id) },
            { $inc: { visit: 1 } });
            if (data) {
                return data;
            } else {
                return [];
            }
        } catch (error) {
            return error;
        }
    }

    public async getAnalytics(id: string) {
        try {
            const [result] = await getManager().collection('url').find({id : id}).toArray();
            if(Object.keys(result).length) {
                return `Total Visit : - ${result.visit}`;
            } else {
                return [];
            }
        } catch (error) {
            throw new Error(error);
        }
    }

}
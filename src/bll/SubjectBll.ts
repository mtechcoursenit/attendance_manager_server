import { getManager } from "../../config/connection";
const nodemailer = require("nodemailer");
import * as dotenv from "dotenv";

dotenv.config();

export class SubjectsBll {

    public async createNewSubject(subjectName: string, userId: string, initialAttendance: Number) {
        try {
            const data = {
                subjectName: subjectName,
                present: initialAttendance,
                absent: initialAttendance,
                userId: userId
            }
            const result = await getManager().collection('subject').insertOne(data);
            return result.ops;
        } catch (err) {
            return err;
        }
    }

    public async getSubjects(userId: string) {
        try {
            const result = await getManager().collection('subject').find({userId: userId}).toArray();
            return result;
        } catch (err) {
            return err;
        }
    }


    public async updateAttendance(subjectName: string, userId: string, presentAttendance: Number, absentAttendance: number) {
        try {
            const result = await getManager().collection('subject').updateOne({
                userId: userId,
                subjectName: subjectName
            }, {
                $set: {
                    "present": presentAttendance,
                    "absent": absentAttendance
                }
            });

            return result;
        } catch (err) {
            return err;
        }
    }

    public async deleteSubject(subjectName: string, userId: string) {
        try {
            const result = await getManager().collection('subject').deleteOne({
                userId: userId,
                subjectName: subjectName
            });
            return result;
        } catch (err) {
            return err;
        }
    }

    public async sendMail() {
        try {
            const users = await getManager().collection('users').find({}).toArray();
            const mailIds = this.getMailIds(users);
            const result  = await this.sendNotification(mailIds);
            return result;
        } catch (err) {
            return err;
        }
    }

    public getMailIds(users) {
        let Ids = '';
        Ids = users.map(user => user.email).join(',');
        return Ids;
    }

    public async sendNotification(list) {
        try {
            var transporter = nodemailer.createTransport({
                service: process.env.service,
                auth: {
                    user: process.env.authUser,
                    pass: process.env.authpass
                }
            });
    
            var mailOptions = {
                from: process.env.authUser,
                to: list,
                subject: 'Notification From Attendance Manager => Update your Attendance',
                text: "Please Update your Attendance for today, if you haven't done yet\n Thank you"
            };
    
            const result =  await transporter.sendMail(mailOptions);
            return result;
        } catch (err) {
            return err;
        }
    }
}
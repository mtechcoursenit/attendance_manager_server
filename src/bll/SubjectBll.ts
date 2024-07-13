import { SubjectWithoutIdentifierError } from "typeorm";
import { getManager } from "../../config/connection";
const nodemailer = require("nodemailer");

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

    public async sendMail(text) {
        try {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'nodeattendance@gmail.com',
                    pass: 'zndu omns mjcm erlh'
                }
            });
    
            var mailOptions = {
                from: 'nodeattendance@gmail.com',
                to: 'somnathb583@gmail.com, mtechcoursenit@gmail.com',
                subject: 'Sending Email using Node.js',
                text: 'That was easy!'
            };
    
            const result =  await transporter.sendMail(mailOptions);
            return result;
        } catch (err) {
            return err;
        }
    }
}
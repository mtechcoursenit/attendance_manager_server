import { getManager } from "../../config/connection";

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
}
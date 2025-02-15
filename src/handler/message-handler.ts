import { SubjectsBll } from "../bll/SubjectBll";
import { UserBll } from "../bll/UserBll";
import { getBroker } from "../index";
import { isloggedIn } from "../middleware/authmiddleware";

export const getMessage = async () => {
    const mq = getBroker();
    mq.consume('createUserQue', async (content) => {
        console.log("✅✅ Message Received in createUserEx");
        let message = JSON.parse(JSON.parse(JSON.stringify(content.content.toString())));
        const result = await new UserBll().createUser(message);
        mq.ack(content);
    })

    mq.consume('userLoginQue', async (content) => {
        console.log("✅✅ Message Received in userLoginQue");
        let message = JSON.parse(JSON.parse(JSON.stringify(content.content.toString())));
        const result = await new UserBll().userLogin(message);
        console.log(result);
        mq.ack(content);
    })

    mq.consume('createSubjectQue', async (content) => {
        console.log("✅✅ Message Received in createSubjectQue")
        let message = JSON.parse(JSON.parse(JSON.stringify(content.content.toString())));
        if (isloggedIn()) {
            const result = await new SubjectsBll().createNewSubject(message.body.subjectName, message.body.userId, 0);
            console.log(result);
        } else {
            console.log('User not logged in')
        }
        mq.ack(content);
    })

    mq.consume('deleteAttendanceQue', async (content) => {
        console.log("✅✅ Message Received in deleteAttendanceQue")
        let message = JSON.parse(JSON.parse(JSON.stringify(content.content.toString())));
        if (isloggedIn()) {
            const result = await new SubjectsBll().deleteSubject(message.body.subjectName, message.body.userId);
        } else {
            console.log('User not logged in');
        }
        mq.ack(content);
    })

    mq.consume('updateAttendanceQue', async (content) => {
        console.log("✅✅ Message Received in updateAttendanceQue")
        let message = JSON.parse(JSON.parse(JSON.stringify(content.content.toString())));

        if (isloggedIn()) {
            const result = await new SubjectsBll().updateAttendance(message.body.subjectName, message.body.userId, message.body.presentAttendance, message.body.absentAttendance);
            if (result.modifiedCount) {
                console.log('Updated successfully');
            } else {
                console.log('No record found')
            }
        } else {
            console.log('User not logged in');
        }
        mq.ack(content);
    })

    mq.consume('getSubjectsQue', async (content) => {
        console.log("✅✅ Message Received in getSubjectsQue")
        let message = JSON.parse(JSON.parse(JSON.stringify(content.content.toString())));

        if (isloggedIn) {
            const result = await new SubjectsBll().getSubjects(message.body.userId);
            if (result) {
                console.log(result);
            } else {
                console.log('No subjects found')
            }
        }  else {
            console.log('User not logged in');
        }
        mq.ack(content);
    })
}
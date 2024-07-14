import { UserBll } from "../bll/UserBll";
import { getBroker } from "../index"

export const getMessage = async () => {
    const mq = getBroker();
    mq.consume('createUserQue', async (content) => {
        console.log("✅✅ Message Received in createUserEx");
        let message = JSON.parse(JSON.parse(JSON.stringify(content.content.toString())));
        await new UserBll().createUser(message);
        mq.ack(content);
    })

    mq.consume('userLoginQue', async (content) => {
        console.log("✅✅ Message Received in userLoginQue")
        let message = JSON.parse(JSON.parse(JSON.stringify(content.content.toString())));
        const result = await new UserBll().userLogin(message);
        mq.ack(content);
    })

    mq.consume('userSignQue', async (content) => {
        console.log("✅✅ Message Received in userSignQue")
        let message = JSON.parse(JSON.parse(JSON.stringify(content.content.toString())));
        const result = await new UserBll().userLogin(message);
        mq.ack(content);
    })
}
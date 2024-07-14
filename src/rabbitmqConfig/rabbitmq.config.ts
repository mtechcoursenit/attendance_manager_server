import * as dotenv from "dotenv";


dotenv.config();

export const rabbitmqConfig = {
    url: process.env.amqp,
    exchanges: [
        {
            name: 'createUserEx',
            type: 'direct'
        },
        {
            name: 'userLoginEx',
            type: 'direct'
        }
    ],
    queues: [
        {
            name: 'createUserQue',
            routingKey: 'createUserRK',
            exchangeName: 'createUserEx',
        },
        {
            name: 'userLoginQue',
            routingKey: 'userLoginRK',
            exchangeName: 'userLoginEx'
        }
    ]
};
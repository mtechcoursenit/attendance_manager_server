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
        },
        {
            name: 'createSubjectEx',
            type: 'direct'
        },
        {
            name: 'deleteAttendanceEx',
            type: 'direct'
        },
        {
            name: 'updateAttendanceEx',
            type: 'direct'
        },
        {
            name: 'getSubjectsEx',
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
        },
        {
            name: 'createSubjectQue',
            routingKey: 'createSubjectRK',
            exchangeName: 'createSubjectEx'
        },
        {
            name: 'deleteAttendanceQue',
            routingKey: 'deleteAttendanceRK',
            exchangeName: 'deleteAttendanceEx'
        },
        {
            name: 'updateAttendanceQue',
            routingKey: 'updateAttendanceRK',
            exchangeName: 'updateAttendanceEx'
        },
        {
            name: 'getSubjectsQue',
            routingKey: 'getSubjectsRK',
            exchangeName: 'getSubjectsEx'
        }
    ]
};
import { Room, RoomUser, Message, SelectRoomData } from './types/types'


const getMessagesRoom = (room: string, messages: Message[]) => {
    const messagesRoom = messages.filter(message => message.room === room)
}

export const userExist = (verifyUser: RoomUser, users: RoomUser[]):RoomUser => {
    let user_response:RoomUser = {
        socket_id:'',
        username:'',
        room:''
    };
    users.find((user: RoomUser) => {
        if (
            user.username === verifyUser.username &&
            user.room === verifyUser.room
        ) {
            user_response = {...verifyUser}
            return user_response;
        } else {
            return user_response
        }
    })
    return user_response;
}

export const removeUserOfRoom = (verifyUser: RoomUser, users: RoomUser[]) => {
    users.map((user: RoomUser,index:number) => {
        if (
            user.username === verifyUser.username &&
            user.room === verifyUser.room
        ) {
            users.splice(index, 1)
        } 
    })
}


export const includeMessageInRoom = (rooms:Room[],message:Message) => {
    rooms.map((room_)=>{
        if(room_.name === message.room){
            room_.messages?.push(message);
        }
    })
}

export const contructorMessage = (data:any) => {
    const message: Message = {
        room: data.room,
        username: data.username,
        message: data.message,
        createAt: new Date()
    }
    return message;
}


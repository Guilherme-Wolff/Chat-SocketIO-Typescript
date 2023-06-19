import { Socket } from "socket.io";
import { io } from './http'
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Room, RoomUser, Message, SelectRoomData } from './types/types'

import {userExist,removeUserOfRoom,contructorMessage} from "./utils"

const MAX_NUM_MESSAGES:number = 60;
let NUM_RESUEST:number = 0;

let roomTest: Room = {
    id: "123456",
    name: "cpp",
    clients: []
}
const Rooms: Room[] = [roomTest]
const users: RoomUser[] = []
const messages: Message[] = []

const getMessagesRoom = (messages_: Message[],room: string) => {
    const messagesRoom = messages_.
    filter(message => message.room === room);

    return messagesRoom;
}

io.on("connection", socket => {
    socket.on("select_room", (data, callback) => {
        if (!data) {
            return;
        }
        ++NUM_RESUEST;
        //console.log("REQUESTS: ",NUM_RESUEST)
        socket.join(data.room)
        //console.log("socketdata", data)
        
            /*users.map((user:any)=>{
                console.log("USERS: ",users.length)
                console.log("USERS: ",user)
            })*/


        let userInRoom:RoomUser = userExist(data,users)

        /*let userInRoom:RoomUser = users.find((user: RoomUser) => {
            user.username === data.username &&
                user.room === data.room
        })*/

        //console.log("ADAPT", io.sockets.adapter.rooms)

        if (userInRoom.username) {
            //console.log("usuario existe")
            userInRoom.socket_id = socket.id
            //console.log("ID: ",userInRoom.socket_id)
        } else {
            users.push({
                socket_id: socket.id,
                username: data.username,
                room: data.room
            })
        }

        const messagesRoom = getMessagesRoom(messages,data.room)
        //console.log("NUM USERS: ", users.length)
        //send list of message 
        callback(messagesRoom)
    })
    socket.on("message", (data) => {
        //console.log("\x1b[33m MGS: ", data)
        const message: Message = contructorMessage(data)
       
        if(messages.length < MAX_NUM_MESSAGES + 1){
            messages.push(message);
        }
        
        //includeMessageInRoom(Rooms,message)
        /*messages.map((msg:any)=>{
            console.log("MESSAGES : ",msg)
        })*/
        /*Rooms.map((r:any)=>{
            if(r.name === data.room){
                r.messages.map((msgs:any)=>{
                    console.log("ROOM MSGS : ",msgs)
                })
            }
        })*/
        io.to(data.room).emit("message", message)
    })

    socket.on("verify_new_messages", (data,callback) => {
        let userInRoom:RoomUser = userExist(data,users)
        if(userInRoom){
            removeUserOfRoom(data,users)
            socket.disconnect()
        }
        const messagesRoom = getMessagesRoom(messages,data.room)
        const last_message = messagesRoom[messagesRoom.length -1]
        if(!last_message){
            return;
        }else{
            if(last_message?.message === data.message &&
                last_message.username === data.username &&
                last_message.createAt === data.createAt &&
                last_message.room === data.room
               ){
                 return callback({status:false});
             }else{
                 callback(messagesRoom)
             }
        }
        
        
    })
    
    socket.on("disconnectforce", (data:RoomUser) => {
        let userInRoom:RoomUser = userExist(data,users)
        if(userInRoom){
            
            removeUserOfRoom(data,users)
            socket.leave(data.room)
            socket.disconnect()
            console.log(data.username," disconectando")
        }
        
    })
})
import { Socket} from "socket.io";
export interface SelectRoomData {
    username:string;
    room:string;
}
export interface Client {
    client:Socket;
}

export interface Room {
    id:string;
    name:string;
    clients:Array<Socket>;
    messages?:Message[];
}

export interface RoomUser {
    socket_id:string;
    username:string;
    room:string;
}

export interface Message {
    room?:string;
    message?:string;
    createAt?:Date;
    username?:string;
    own?:boolean;  
    avatar?:string;
    id?: number;
}








export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
    hello: () => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    name: string;
    age: number;
}
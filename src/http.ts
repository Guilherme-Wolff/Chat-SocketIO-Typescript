import express from 'express';
import { Server ,Socket} from "socket.io";
import http from 'http'
import cors from "cors"
const PORT: number = 3001

const app = express();
app.use(cors({
  origin: ['*','https://nodejsclusters-147755-0.cloudclusters.net'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  transports: ['websocket', 'polling'], // Permite WebSocket e polling
})

export { httpServer,io}


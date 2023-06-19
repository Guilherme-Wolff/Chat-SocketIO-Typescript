import {httpServer } from './http'
import './websocket'
const PORT: number = 3001

httpServer.listen(PORT,()=>{
    console.log('running on port ',PORT)
})

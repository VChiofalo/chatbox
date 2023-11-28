import http from 'http';
import path from 'path';
import serveStatic  from 'serve-static';
import finalhandler from 'finalhandler';
import { Server } from "socket.io";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const serve =  serveStatic(path.join(__dirname, 'public'), {index: 'index.html'});
const httpServer = http.createServer((req,res) =>
    serve(req, res, finalhandler(req, res))
);
httpServer.listen(9000, () => { console.log(`http://localhost:9000`); });

//----------------------------------------------------------
// Mise en place des WebSockets
//----------------------------------------------------------
let users = [];
const io = new Server(httpServer);
io.on('connection', (socket) => {
    console.log('nouveau !!!');

    socket.on('client:user:pseudo', (user) => {
        if (users.includes(user)) {
            console.log('ici');
            socket.emit('server:user:exist')
        } else {
            users.push(user)
            socket.emit('server:user:connected')
        }
        console.table(users);
    })
});
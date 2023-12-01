import http from 'http';
import path from 'path';
import serveStatic  from 'serve-static';
import finalhandler from 'finalhandler';
import { fileURLToPath } from 'url';
import Chat from './app/Chat.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const serve =  serveStatic(path.join(__dirname, 'public'), {index: 'index.html'});
const httpServer = http.createServer((req,res) =>
    serve(req, res, finalhandler(req, res))
);
httpServer.listen(9000, () => { console.log(`http://localhost:9000`); });

//----------------------------------------------------------
// Mise en place des WebSockets
//----------------------------------------------------------

const chat = new Chat(httpServer);

/* let users = [];
const io = new Server(httpServer);
io.on('connection', (socket) => {
    //console.log('nouveau !!!');
    socket.on('client:user:pseudo', (user) => {
        if (users.includes(user)) {
            socket.emit('server:user:exists');
        } else {
            users.push(user);
            socket.user = user;
            socket.emit('server:user:connected');
            io.emit('server:user:list', users);
        }
    })

    socket.on('client:user:disconnect', ()=>{
        users.splice(users.indexOf(socket.user), 1);
        socket.emit('server:user:disconnected');
        io.emit('server:user:list', users);
    })
}); */

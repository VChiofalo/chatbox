import http from 'http';
import path from 'path';
import serveStatic  from 'serve-static';
import finalhandler from 'finalhandler';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const serve =  serveStatic(path.join(__dirname, 'public'), {index: 'index.html'});
const httpServer = http.createServer((req,res) =>
    serve(req, res, finalhandler(req, res))
);
httpServer.listen(9001, () => { console.log(`http://localhost:9001`); });
import { createServer } from "node:http";
import { server as wisp } from "@mercuryworkshop/wisp-js/server";



const server = createServer();

server.on("request", (req, res) => {
    res.writeHead(200);
    res.end("Wisp server is running! Use the URL of this site as your wispUrl.");
});

server.on("upgrade", (req, socket, head) => {
    if (req.url.endsWith("/wisp/")) {
        wisp(req, socket, head);
    } else {
        socket.end();
    }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

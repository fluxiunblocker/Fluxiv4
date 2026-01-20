import express from "express";
import { createBareServer } from "@tomphttp/bare-server-node";
import { createServer } from "node:http";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
import wisp from "wisp-server-node";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const server = createServer();
const bareServer = createBareServer("/bare/");

app.use("/x1y2/", express.static(uvPath));
app.use("/c5d6/", express.static(epoxyPath));
app.use("/a3b4/", express.static(baremuxPath));
app.use(express.static(path.join(__dirname, "public")));

server.on("request", (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else if (req.url.endsWith("/e7f8/")) {
    wisp.routeRequest(req, socket, head);
  } else {
    socket.end();
  }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

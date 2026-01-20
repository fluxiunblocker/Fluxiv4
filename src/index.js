import express from "express";
import { createServer } from "http";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
import { createBareServer } from "@tomphttp/bare-server-node";
import wisp from "wisp-server-node";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const bare = createBareServer("/bare/");

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

app.use(express.static(join(__dirname, "../public")));
app.use("/x1y2/", express.static(uvPath));
app.use("/c5d6/", express.static(epoxyPath));
app.use("/a3b4/", express.static(baremuxPath));

const server = createServer((req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else if (req.url.endsWith("/ws/")) {
    wisp.routeRequest(req, socket, head);
  } else {
    socket.end();
  }
});

server.on("error", (err) => {
  console.error("Server error:", err);
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

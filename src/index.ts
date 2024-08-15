import { participantsRoutes } from "./routes/participants";
import { messagesRoutes } from "./routes/messages";

const server = Bun.serve({
  port: 4000,
  fetch(req) {
    const url = new URL(req.url);

    if (url.pathname.startsWith("/participants")) {
      return participantsRoutes(req, url);
    }

    if (url.pathname.startsWith("/messages")) {
      return messagesRoutes(req, url);
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log("Server is running on http://localhost:4000");

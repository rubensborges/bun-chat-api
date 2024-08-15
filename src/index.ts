const server = Bun.serve({
  port: 3001,
  fetch(req) {
    const url = new URL(req.url);
    const { method } = req;

    if (method === "POST" && url.pathname === "/participants") {
      return handleAddParticipant(req);
    }
  },
});

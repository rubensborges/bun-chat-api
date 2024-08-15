const server = Bun.serve({
  port: 3001,
  fetch(req) {
    return new Response("server running")
    }

  })
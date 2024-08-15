interface Participant {
  name: string;
  lastStatus: number;
}

interface Message {
  from: string;
  to: string;
  text: string;
  type: "message" | "private_message" | "status";
  time: string;
}

let participants: Participant[] = [];
let messages: Message[] = [];

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

async function handleAddParticipant(req: Request) {
  const body = await req.json();
  const { name } = body;

  if (!name) {
    return new Response(null, { status: 400 });
  }
  return new Response("", { status: 200 });
}

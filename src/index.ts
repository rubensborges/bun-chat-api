import dayjs from "dayjs";
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

    if (method === "GET" && url.pathname === "/participants") {
      return handleGetParticipants();
    }

    if (method === "POST" && url.pathname === "/messages") {
      return handleAddMessages(req);
    }

    return new Response("Not Found", { status: 404 });
  },
});

async function handleAddParticipant(req: Request) {
  const body = await req.json();
  const { name } = body;

  if (!name) {
    return new Response(null, { status: 400 });
  }
  const participantAlreadyExists = participants.some(
    (participant) => participant.name === name
  );

  if (participantAlreadyExists) {
    return new Response(null, { status: 400 });
  }

  const participant: Participant = {
    name,
    lastStatus: Date.now(),
  };
  participants.push(participant);

  const currentTime = dayjs().format("HH:mm:ss");

  const message: Message = {
    from: name,
    to: "Todos",
    text: "entra na sala...",
    type: "status",
    time: currentTime,
  };

  messages.push(message);

  return new Response("ok", { status: 200 });
}

async function handleGetParticipants() {
  return new Response(JSON.stringify(messages));
}

async function handleAddMessages(req: Request) {
  const body: {
    to?: string;
    text?: string;
    type?: "message" | "private_message";
  } = await req.json();

  const { to, text, type } = body;
  const from = req.headers.get("User");

  if (!from || !to || !text || !type) {
    return new Response(null, { status: 400 });
  }

  const message: Message = {
    from,
    to,
    text,
    type,
    time: dayjs().format("HH:mm:ss"),
  };

  messages.push(message);

  return new Response("ok", { status: 200 });
}

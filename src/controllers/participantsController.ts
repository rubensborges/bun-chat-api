import { participants, type Participant } from "../models/participant";
import { messages, type Message } from "../models/message";
import dayjs from "dayjs";

export async function handleAddParticipant(req: Request) {
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

export async function handleGetParticipants() {
  return new Response(JSON.stringify(participants));
}

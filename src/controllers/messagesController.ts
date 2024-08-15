import { messages, type Message } from "../models/message";
import { participants } from "../models/participant";
import dayjs from "dayjs";

export async function handleAddMessages(req: Request): Promise<Response> {
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

  const participantExists = participants.some(
    (participant) => participant.name === from
  );

  if (!participantExists) {
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

export function handleGetMessages(
  req: Request,
  params: URLSearchParams
): Response {
  return new Response();
}

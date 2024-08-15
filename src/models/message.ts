export interface Message {
  from: string;
  to: string;
  text: string;
  type: "message" | "private_message" | "status";
  time: string;
}

export let messages: Message[] = [];

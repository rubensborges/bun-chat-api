import {
  handleAddParticipant,
  handleGetParticipants,
} from "../controllers/participantsController";

export function participantsRoutes(req: Request, url: URL) {
  const { method } = req;

  if (method === "POST" && url.pathname === "/participants") {
    return handleAddParticipant(req);
  }

  if (method === "GET" && url.pathname === "/participants") {
    return handleGetParticipants();
  }

  return new Response("Not Found", { status: 404 });
}

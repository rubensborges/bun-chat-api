import {
  handleAddMessages,
  handleGetMessages,
} from "../controllers/messagesController.ts";

export function messagesRoutes(req: Request, url: URL) {
  const { method } = req;

  if (method === "POST" && url.pathname === "/messages") {
    return handleAddMessages(req);
  }

  if (method === "GET" && url.pathname === "/messages") {
    const params = url.searchParams;
    return handleGetMessages(req, params);
  }

  return new Response("Not Found", { status: 404 });
}

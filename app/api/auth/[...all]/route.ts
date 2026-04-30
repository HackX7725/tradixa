import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth);

export const GET = async (req: Request) => {
  console.log(`[Auth API] GET ${req.url}`);
  return handler.GET(req);
};

export const POST = async (req: Request) => {
  console.log(`[Auth API] POST ${req.url}`);
  return handler.POST(req);
};

// server/routes.ts
import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // no contact route anymore
  const httpServer = createServer(app);
  return httpServer;
}


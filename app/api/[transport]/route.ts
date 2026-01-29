import { auth } from "@/lib/auth";
import { createMcpHandler } from "@vercel/mcp-adapter";
import { withMcpAuth } from "better-auth/plugins";
import { z } from "zod";
import { NextResponse } from "next/server";

const safeHandler = async (req: Request) => {
	try {
		const handler = withMcpAuth(auth, (req, session) => {
			return createMcpHandler(
				(server) => {
					server.registerTool(
						"echo",
						{
							description: "Echo a message",
							inputSchema: z.object({
								message: z.string(),
							}),
						},
						async ({ message }) => {
							return {
								content: [{ type: "text", text: `Tool echo: ${message}` }],
							};
						},
					);
				},
				{
					capabilities: {
						tools: {
							listChanged: true,
						},
					},
				},
			)(req);
		});

		const result = await handler(req);
		// Si result ya es un Response válido, lo devolvemos
		return result;
	} catch (error) {
		console.error("Error en API /[transport]/route:", error);
		return NextResponse.json(
			{ error: "Error interno del servidor" },
			{ status: 500 }
		);
	}
};

export { safeHandler as GET, safeHandler as POST, safeHandler as DELETE };

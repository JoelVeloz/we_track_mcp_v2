import { auth } from "@/lib/auth";
import { createMcpHandler } from "@vercel/mcp-adapter";
import { withMcpAuth } from "better-auth/plugins";
import { z } from "zod";

const handler = withMcpAuth(auth, (req, sesssion) => {
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

export { handler as GET, handler as POST, handler as DELETE };

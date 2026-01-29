import { createMcpHandler } from "@vercel/mcp-adapter";
import { z } from "zod";

const handler = createMcpHandler(
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
);

export { handler as GET, handler as POST };

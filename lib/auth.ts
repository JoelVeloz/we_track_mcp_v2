import { betterAuth } from "better-auth";
import { mcp } from "better-auth/plugins";
import Database from "better-sqlite3";
import { oauthProvider } from "@better-auth/oauth-provider";

const config = {
	AUTH_CLIENT_URL: process.env.BASE_URL || "http://localhost:3000",
	AUTH_SECRET: process.env.AUTH_SECRET,
}

export const auth = betterAuth({
	database: new Database("./auth.db"),
	// baseURL: "http://localhost:3000",
	baseURL: process.env.BASE_URL,
	plugins: [
		// oauthProvider({
		// 	allowUnauthenticatedClientRegistration: true,
		// 	allowDynamicClientRegistration: true,
		// 	loginPage: `${config.AUTH_CLIENT_URL}/sign-in`,
		// 	consentPage: `${config.AUTH_CLIENT_URL}/consent`,
		// 	validAudiences: [config.AUTH_CLIENT_URL]

		// }),

		mcp({
			loginPage: "/sign-in",

		}),
	],
	emailAndPassword: {
		enabled: true,
	},
});

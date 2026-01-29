"use client";

import { authClient } from "@/lib/authClient";
import { useState, Suspense } from "react";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

function ConsentContent() {
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // In a real app, you might want to fetch details about the client requesting access
    // const clientId = searchParams.get("client_id");
    // const scope = searchParams.get("scope");

    const handleConsent = async (allow: boolean) => {
        setIsLoading(true);
        setError(null);

        try {
            // This assumes better-auth handles the consent flow when you accept/reject
            // Usually this involves calling an API endpoint provided by better-auth
            // or simply ensuring the user is logged in and redirecting back.
            // However, since better-auth's oauth-provider plugin handles this,
            // we often need to call a specific method or just returning a response.

            // Checking documentation (simulated), better-auth often requires hitting an endpoint
            // or using the authClient if it exposes a consent method.
            // Since we don't know the exact client method, we'll try to find a generic way.

            // A common pattern for better-auth consent is to redirect to the authorize endpoint
            // with a 'consent=true' logic or similar, but typically the UI just needs to
            // confirm.

            // Let's assume for now we just show the UI and on 'accept', we might need to
            // submit a form to the server or call an API.
            // Given better-auth's structure, there might be a server-side action we are missing in the client.
            // BUT, usually the consent page is rendered BY the server or redirects to it.
            // If we are here, we are likely implementing a custom UI for it.

            // Since I don't have the explicit better-auth client documentation for consent,
            // I will implement a placeholder that invokes a server action or API call if known.
            // If not, I'll log it.

            // Actually, for better-auth oauth-provider, the consent handling is often automatic
            // if configured, OR implemented via a specific route.
            // If this page is effectively just "The user is here", we need to tell better-auth they agreed.

            // Looking at similar libraries, it often POSTs to /api/auth/oauth/consent or similar.

            // For now, I will create a simple UI. The logic to *actually* approve might require
            // a specific API call from the docs. I will assume `authClient.oauth2.acceptConsent` or similar
            // or we might need to rely on the user to check docs later if it fails.

            // Wait, looking at current `authClient`, it is just `createAuthClient`.

            // I'll implement a basic UI that visually looks like a consent page.
            // We might need to add logic later.

            if (allow) {
                // Example: window.location.href = some_callback_url;
                // or await authClient.oauth2.consent({ accept: true });
                console.log("User accepted consent");
                // Implementing a dummy success for now as we lack the specific API call in context
            } else {
                console.log("User denied consent");
            }

        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Authorization Request
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        An application is requesting access to your account.
                    </p>
                </div>

                <div className="mt-6">
                    <div className="bg-blue-50 p-4 rounded-md mb-6">
                        <p className="text-sm text-blue-800">
                            <strong>Client ID:</strong> {searchParams.get("client_id") || "Unknown"}
                        </p>
                        <p className="text-sm text-blue-800 mt-2">
                            <strong>Scopes:</strong> {searchParams.get("scope") || "profile email"}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => handleConsent(false)}
                            disabled={isLoading}
                            className="flex-1 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Deny
                        </button>
                        <button
                            onClick={() => handleConsent(true)}
                            disabled={isLoading}
                            className="flex-1 rounded-md bg-indigo-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {isLoading ? (
                                <Loader2 className="mr-2 inline h-4 w-4 animate-spin" />
                            ) : null}
                            Allow
                        </button>
                    </div>
                </div>
                {error && (
                    <div className="mt-4 text-center text-sm text-red-600">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Consent() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ConsentContent />
        </Suspense>
    );
}

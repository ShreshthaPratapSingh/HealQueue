import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth(allowedRole: string) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/auth/me", {
                    credentials: "include",
                });

                // Only redirect to login on genuine auth failures (401)
                if (res.status === 401) {
                    router.push("/login");
                    return;
                }

                // On server errors (5xx), don't logout — the token might be valid,
                // the server is just having issues. Let the page load.
                if (!res.ok) {
                    console.warn(`Auth check returned ${res.status}, not logging out`);
                    setLoading(false);
                    return;
                }

                const data = await res.json();

                // Role mismatch — redirect to the correct dashboard, not /login
                if (data.user.role !== allowedRole) {
                    const rolePath = data.user.role.toLowerCase();
                    // If the user is authenticated but wrong role, send them
                    // to their own dashboard instead of login
                    router.push(`/${rolePath}`);
                    return;
                }

                setLoading(false);
            } catch {
                // Network error (server is down, timeout, etc.)
                // Do NOT redirect to login — the JWT may be perfectly valid.
                // Just let the page load so the user isn't kicked out.
                console.warn("Auth check failed (network error), not logging out");
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    return { loading };
}

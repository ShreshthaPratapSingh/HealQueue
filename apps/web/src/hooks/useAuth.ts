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

                if (!res.ok) {
                    router.push("/login");
                    return;
                }

                const data = await res.json();

                if (data.user.role !== allowedRole) {
                    router.push("/login");
                    return;
                }

                setLoading(false);
            } catch {
                router.push("/login");
            }
        };
        checkAuth();
    }, []);

    return { loading };
}

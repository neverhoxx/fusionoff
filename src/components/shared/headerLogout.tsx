'use client';

import { useRouter } from "next/navigation";
import { Header } from "./header";

interface Props {
    user: {
        id: string;
        email: string;
        username: string;
    } | null;
}

export default function HeaderWithLogout({ user }: Props) {
    const router = useRouter();

    const logout = async () => {
        await fetch('/api/logout', { method: 'POST' });
        router.refresh();
    };

    return <Header user={user} logout={logout} />;
}

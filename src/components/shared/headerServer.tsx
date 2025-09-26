import { getCurrentUser } from "@/lib/getCurrentUser";
import HeaderWithLogout from "./headerLogout";

export const dynamic = 'force-dynamic';

export const HeaderServer = async () => {
    const user = await getCurrentUser();

    return <HeaderWithLogout user={user} />;
};

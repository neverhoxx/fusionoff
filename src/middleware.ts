import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const user = token ? verifyToken(token) : null;

    const url = req.nextUrl.clone();

    if (user && (url.pathname === "/login" || url.pathname === "/register")) {
        url.pathname = "/profile";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/login", "/register", "/auth/login", "/auth/register", "/@auth/login", "/@auth/register"],
};

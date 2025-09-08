import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected routes
const protectedRoutes = ["/dashboard", "/profile", "/orders"];

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Check if current path is protected
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        // Read auth token from cookies
        const token = req.cookies.get("accessToken")?.value;

        if (!token) {
            // Redirect to login if not authenticated
            const loginUrl = new URL("/login", req.url);
            loginUrl.searchParams.set("from", pathname); // optional: redirect back after login
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

// Limit middleware to specific paths
export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*", "/orders/:path*"],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Better auth uses `better-auth.session_token` cookie by default.
  // Note: For a true secure validation, you'd verify the session on the server.
  // Edge middleware cannot use Node.js `firebase-admin` directly, so we rely on the cookie presence
  // or a quick fetch to the session endpoint if needed. For now, cookie check:
  
  const sessionCookie = request.cookies.get("better-auth.session_token");

  // Define protected routes here
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard") || request.nextUrl.pathname.startsWith("/profile");

  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

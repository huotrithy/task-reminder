import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_REDIRECT_BLOCKLIST = ["/login", "/sign-up", "/"];
const AUTH_REQUIRED = ["/app"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Prevent access to login and signup on authenticated user
  if (token && AUTH_REDIRECT_BLOCKLIST.includes(pathname)) {
    return NextResponse.redirect(new URL("/app", request.url));
  }

  // Prevent unauthenticated user to access
  if (!token && AUTH_REQUIRED.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

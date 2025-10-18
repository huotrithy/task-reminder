import { getToken } from "next-auth/jwt";
import { NextResponse, userAgent } from "next/server";
import type { NextRequest } from "next/server";
import { logger } from "./lib/logger";
import { LOG_MESSAGE } from "./shared/log-message";

const AUTH_REDIRECT_BLOCKLIST = ["/login", "/sign-up", "/"];
const AUTH_REQUIRED = ["/app"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const { method } = request;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const agent = userAgent(request);

  if (method !== "GET") {
    const body = await request.json();
    logger.info(LOG_MESSAGE.INCOMMING_REQUEST, {
      method,
      pathname,
      body,
      userEmail: token?.email || "Unknown",
      userAgent: agent.ua,
    });
  }

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
  runtime: "nodejs",
};

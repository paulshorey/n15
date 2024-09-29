import { geolocation, ipAddress } from "@vercel/functions";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest): NextResponse | Promise<NextResponse> {
  const { city } = geolocation(request);
  const ip = ipAddress(request);
  const currentUrl = request.nextUrl.clone();
  const url = currentUrl.pathname;

  // Skip static files
  if (/(.+\..+)$/.test(url)) {
    return NextResponse.next();
  }

  // Continue with regular routing logic
  console.log(`Request to ${url} from ${city}, IP: ${ip}`);
  return NextResponse.next();
}

// Optional: Define paths that should skip this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

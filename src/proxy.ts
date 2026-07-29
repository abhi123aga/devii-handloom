import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/admin(.*)"]);

const clerkHandler = clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});

// Next.js 16 Proxy named export convention
export function proxy(req: any, event: any) {
  return clerkHandler(req, event);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.[\\w]+$|_next/image|favicon.ico).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

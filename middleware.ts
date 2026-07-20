import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Public: landing page, wine-drops FAQ, Kit signup APIs, Clerk webhook.
// Protected: everything under /portal and /admin.
const isProtectedRoute = createRouteMatcher(["/portal(.*)", "/admin(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|admin/index\\.html|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

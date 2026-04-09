// middleware.ts

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define routes that should NOT require Clerk auth
const isPublicRoute = createRouteMatcher([
  '/api/webhooks/clerk',
]);

export default clerkMiddleware((auth, req) => {
  // Skip authentication for webhook route
  if (isPublicRoute(req)) return;

});

export const config = {
  matcher: [
    // Apply middleware to all routes except:
    // - Next.js internals
    // - static files
    // - and explicitly excluded webhook route
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)|api/webhooks/clerk).*)',

    // Always run for API and tRPC routes
    '/(api|trpc)(.*)',
  ],
};
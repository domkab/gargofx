// src/middleware.ts

//  use bits of this code to decide when to init clerk

//  also need adjustment at the root level.

// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// const isProtected = createRouteMatcher([
//   '/(app)(.*)',
//   '/dashboard(.*)',
//   '/account(.*)',
// ])

// export default clerkMiddleware((auth, req) => {
//   if (isProtected(req)) auth().protect()
// })

// export const config = {
//   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api)(.*)'],
// }
// export { default } from 'next-auth/middleware'

export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'], // Specify which routes are protected
};




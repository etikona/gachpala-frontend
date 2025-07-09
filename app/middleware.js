import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const loginType = req.cookies.get("loginType")?.value;
  const { pathname } = req.nextUrl;

  if (!token) {
    if (pathname.startsWith("/user"))
      return NextResponse.redirect(new URL("/login/user", req.url));
    if (pathname.startsWith("/seller"))
      return NextResponse.redirect(new URL("/login/seller", req.url));
    if (pathname.startsWith("/admin"))
      return NextResponse.redirect(new URL("/login/admin", req.url));
  }

  if (loginType === "admin") return NextResponse.next();
  if (pathname.startsWith("/user") && loginType === "user")
    return NextResponse.next();
  if (pathname.startsWith("/seller") && loginType === "seller")
    return NextResponse.next();
  if (pathname.startsWith("/admin") && loginType === "admin")
    return NextResponse.next();

  return NextResponse.redirect(new URL("/", req.url));
}

export const config = {
  matcher: ["/user/:path*", "/seller/:path*", "/admin/:path*"],
};

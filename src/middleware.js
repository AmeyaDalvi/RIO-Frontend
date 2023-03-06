import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
const protectedRoute = ["/profile"];

const isProtected = (element) => protectedRoute.includes(element);

const nextUrl = process.env.NEXT_BASE_URL;

export function middleware(req, res) {
  const { pathname } = req.nextUrl;
  const verify = req.cookies.get("rioUserToken");

  if (!verify && isProtected(pathname)) {
    return NextResponse.redirect(`${nextUrl}/login`);
  }
  if (verify && (pathname === "/login" || pathname === "/signup")) {
    console.log("pathname", pathname);
    return NextResponse.redirect(`${nextUrl}`);
  }
  return NextResponse.next();
}

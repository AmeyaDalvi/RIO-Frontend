import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
const protectedRoute = ["/profile", "/dashboard"];
const adminRoute = ["/admin"];

const isProtected = (element) => protectedRoute.includes(element);
const isAdmin = (element) => adminRoute.includes(element);

const nextUrl = process.env.NEXT_BASE_URL;

export function middleware(req, res) {
  const { pathname } = req.nextUrl;
  const verify = req.cookies.get("rioUserToken");
  const user = req.cookies.get("rioUser");
  const userData = user !== undefined ? JSON.parse(user["value"]) : null;

  if (user !== undefined) {
    if (
      userData["first_name"] !== "admin" &&
      userData["last_name"] !== "admin" &&
      isAdmin(pathname)
    ) {
      return NextResponse.redirect(`${nextUrl}/products`);
    }
  }

  if (!verify && isProtected(pathname)) {
    return NextResponse.redirect(`${nextUrl}/login`);
  }
  if (verify && (pathname === "/login" || pathname === "/signup")) {
    console.log("pathname", pathname);
    return NextResponse.redirect(`${nextUrl}`);
  }
  return NextResponse.next();
}

import { auth } from "@/auth";

export default auth((req) => {
    if ((!req.auth || req.auth.user.role !== "ADMIN") && req.nextUrl.pathname.startsWith("/admin")) {
        const newUrl = new URL("/login", req.nextUrl.origin)
        return Response.redirect(newUrl)
    }
})
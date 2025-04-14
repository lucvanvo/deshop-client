import { auth } from "@/auth";

export default auth((req) => {

    const pathname = req.nextUrl.pathname;
    if ((!req.auth || req.auth.user.role !== "ADMIN") && (pathname.startsWith("/admin") || pathname.startsWith("/order"))) {
        const newUrl = new URL("/login", req.nextUrl.origin)
        return Response.redirect(newUrl)
    }

    if (req.auth && req.auth.user.role === "ADMIN" && (pathname.startsWith("/login") || pathname === "/" || pathname.startsWith("/shopping") || pathname.startsWith("/cart") || pathname.startsWith("/pay"))) {
        const newUrl = new URL("/admin/product", req.nextUrl.origin)
        return Response.redirect(newUrl)
    }
})
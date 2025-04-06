import { handlers } from "../../../../../auth.js" // Referring to the auth.ts we just created
export const { GET, POST } = handlers;

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// const handler = NextAuth({
//     providers: [
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 username: { label: "Tài khoản", type: "text" },
//                 password: { label: "Mật khẩu", type: "password" },
//             },
//             async authorize(credentials) {
//                 const { username, password } = credentials;

//                 // Giả lập kiểm tra tài khoản
//                 if (username === "admin" && password === "123456") {
//                     return {
//                         id: 1,
//                         name: "Admin",
//                         email: "admin@example.com",
//                     };
//                 }

//                 return null;
//             },
//         }),
//     ],
//     secret: process.env.NEXTAUTH_SECRET,
//     pages: {
//         signIn: "/login",
//     },
//     session: {
//         strategy: "jwt",
//     },
// });

// // ✅ Cần export đúng method GET & POST
// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Tài khoản", type: "text" },
                password: { label: "Mật khẩu", type: "password" },
            },
            async authorize(credentials) {
                const { username, password } = credentials;

                // Giả lập kiểm tra tài khoản
                if (username === "admin" && password === "123456") {
                    return {
                        id: 1,
                        name: "Admin",
                        email: "admin@example.com",
                    };
                }

                return null;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
});

export { handler as GET, handler as POST };

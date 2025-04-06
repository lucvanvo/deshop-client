import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

import * as jose from 'jose'

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: {},
                password: {},
            },
            authorize: async (credentials) => {
                const response = await fetch(process.env.BACKEND_LOGIN_URL, {
                    method: "POST",
                    body: JSON.stringify({
                        email: credentials.username,
                        password: credentials.password
                    }),
                    headers: { "Content-Type": "application/json" },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("data", data);
                    const user = await extractUser(data.accessToken);
                    user.refreshToken = data.refreshToken;
                    return user;
                }

                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                    role: user.role,
                    expires_at: user.expires_at,
                }
            } else if (Date.now() / 1000 < token.expires_at) {
                return token;
            } else {
                try {
                    const response = await fetch(process.env.MY_TASK_REFRESH_TOKEN, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ refreshToken: token.refreshToken }),
                    });

                    const newTokens = await response.json();

                    if (!response.ok) throw newTokens;

                    const expiresAt = await getExpireDate(newTokens.accessToken);

                    return {
                        ...token,
                        accessToken: newTokens.accessToken,
                        refreshToken: newTokens.refreshToken,
                        expires_at: expiresAt,
                    }
                } catch (error) {
                    console.error("Error refreshing access token", error);
                    return { ...token, error: "RefreshAccessTokenError" }
                }
            }
        },
        session({ session, token }) {
            if (session.user) {
                session.user.accessToken = token.accessToken;
                session.user.refreshToken = token.refreshToken;
                session.user.role = token.role;
            }
            session.error = token.error;
            return session;
        }
    },
    pages: {
        signIn: "/login",
    }

});


async function getPayload(accessToken) {
    let key = process.env.PUBLIC_KEY
    let header = jose.decodeProtectedHeader(accessToken);
    const publicKey = await jose.importSPKI(key, header.alg)
    return jose.jwtVerify(accessToken, publicKey);
}

async function extractUser(accessToken) {
    const { payload } = await getPayload(accessToken);
    return {
        id: payload.id,
        email: payload.sub,
        accessToken: accessToken,
        role: payload.role,
        expires_at: payload.exp,
        refreshToken: '',
    }
}
async function getExpireDate(accessToken) {
    const result = jose.decodeJwt(accessToken).exp;
    return result ?? Date.now() / 1000;
}
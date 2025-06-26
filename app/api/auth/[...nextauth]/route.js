import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        loginType: { label: "LoginType", type: "text" }, // 'user' or 'seller'
      },
      async authorize(credentials) {
        let loginUrl;

        if (credentials.loginType === "seller") {
          loginUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/seller/login`;
        } else {
          loginUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/login`;
        }

        try {
          const res = await fetch(loginUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const user = await res.json();
          if (res.ok && user) return user;
        } catch (err) {
          console.error("Login error:", err);
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login/user", // fallback
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || null;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.email = token.email;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

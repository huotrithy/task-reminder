import { getServerSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "@/lib/services/auth-service";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "johndoe@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },

      // Verify user cred
      // function will invoke when client call signin react hook
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Please enter your credential.");
        }

        const loginResult = await login({
          email: credentials.email,
          password: credentials.password,
        });

        if (loginResult.success) {
          return {
            id: loginResult.data.user.id,
            email: loginResult.data.user.email,
          };
        }
        throw new Error(loginResult.message || "An error occurred.");
      },
    }),
  ],

  callbacks: {
    // Call when JSON Web Token is created or updated
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    // Call whenever session is checked
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // return url if in same domain
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);

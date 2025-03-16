import axios, { AxiosError } from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials, req) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_URL_API}/auth/login`,
            {
              dni: req.body.dni,
              password: req.body.password,
            }
          );
          return response.data;
        } catch (error) {
          if (error instanceof AxiosError) {
            const axiosErrors = error.response.data;
            axiosErrors.status = error.response.status;
            throw new Error(JSON.stringify(axiosErrors));
          } else {
            throw new Error(JSON.stringify(error));
          }
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      return user;
    },
    async jwt({ token, trigger, session, user }) {
      if (trigger === "update" && session.usuario) {
        token.usuario = session.usuario;
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/perfil/login",
    signOut: "/perfil/logout",
  },
  session: {
    maxAge: 7 * 24 * 60 * 60,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };

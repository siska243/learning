import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { FetchData } from "@/globalJs/FetchData";

export default NextAuth({
  NEXTAUTH_URL:
    process.env.NODE_ENV == "development"
      ? "http://localhost:3000"
      : "https://sims-opportunity.com/",
  secret: process.env.NEXT_PUBLIC_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const variables = {
          username: credentials?.username,
          password: credentials?.password,
        };

        const response = await FetchData.sendData("login", variables);
        if (response.token) {
          return response;
        }
        
        return Promise.reject(response.response.data);
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user.token;
        token.sub = user.data?.roles;
      }

      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken;
      session.error = token.error;
      session.roles = token.sub;
      return Promise.resolve(session);
    },
  },
});
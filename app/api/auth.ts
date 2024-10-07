import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
const { PrismaClient } = require("@prisma/client");
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function getUser(username: string) {
    try {
      const user = await prisma.user.createMany({
        data: [{
          username: 'admin',
          password: 'passwordsconnect'
        }]
      })
    }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            username: z.string().refine((val) => val.trim().length >= 3, {
              message:
                "Username must be at least 3 characters long",
            }),
            password: z
              .string()
              .min(8, "Password must be at least 8 characters long"),
          })
          .safeParse(credentials);

      },
    }),
  ],
});

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import bcrypt from "bcryptjs";
import prisma from "../../services/Wrappers/prisma";
import { JwtToken } from "../../services/Wrappers/JwtToken";

export default async function handler(req, res) {
  if (req.method != "POST")
    return res.status(405).message({ title: "Method not allow" });
  const { body } = req;
  const email = body.email;
  const password = body.password;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      role: {
        select: {
          title: true,
          roles: true,
          slug: true,
        },
      },
      sexe: {
        select: {
          shortName: true,
          title: true,
        },
      },
      lastName: true,
      firstName: true,
      slug: true,
      avatar: true,
      password:true
    },
  });
  if (!user) return res.status(401).json({ message: "Invalide credential" });

  bcrypt.compare(password, user.password, (error, isMatch) => {
   
    if (error) {
      // Handle the error, e.g., log it or return an error response
      return res.status(401).json({ message: error });
    }

    if (isMatch) {
      // Passwords match, user is authenticated
      const token = JwtToken.EncodeJwt(user);
      delete user.password
      return res.status(200).json({
          token,
          user,
      });
    
    } else {
      // Passwords do not match, user authentication failed
      return res.status(401).json({ message: "Invalide crential" });
      
    }
  });
}


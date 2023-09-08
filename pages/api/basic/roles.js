// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import prisma from "../../../services/Wrappers/prisma"

export default async function handler(req, res) {
    if(!req.method=="GET") return res.status(405).json({message:'method not allow'})

    const roles=await prisma.role.findMany({
        where:{
            NOT:{
                slug:'role-admin'
            }
        },
        select:{
            title:true,
            slug:true
        }
    })
    res.status(200).json({ data: roles })
  }
  
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../services/Wrappers/prisma";
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method != "POST")
    res.status(405).json({ message: "Method not allow" });
    const saltRounds = 10;
    
  try {
    const body = req.body;
    let user;
    let roles
    user = await verificationUserExist(body.email, body.slug);
  
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);
    
    if (user)
      return res
        .status(400)
        .json({ title: "error", message: "cet utilisateur existe deja" });
    else {
      if(hashedPassword){
        body.hashedPassword=hashedPassword
        roles=await verifRoleUser(body.roles,body)
        console.log(roles)
      }

    }
    res.status(200).json({ roles });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ title: "error", message: error });
  }
}

const verificationUserExist = async (email) => {
  const verifUser = await prisma.user.findUnique({
    where: {
      email 
    },
  });

  if (verifUser) return true;
  else return false;
};

const verifRoleUser=async(slug,body)=>{
  const role=await prisma.role.findFirst({
    where:{
      slug
    }
  })

  
  if(role?.roles.includes('ROLE_STUDENT')){
    //etudiant
    const user=prisma.user.create({
      data:{
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        password: body.hashedPassword,
        slug: body.slug,
        roleId:role.id,
        isActive:true,
        student:{
          create:{}
        }
      },
      select:{
        student:true,
        firstName:true,
        lastName:true
      }
    })

    return user

  }
  else if(role?.roles.includes('ROLE_TRAINER')){
    //
    const user=prisma.user.create({
      data:{
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        password: body.hashedPassword,
        slug: body.slug,
        roleId:role.id,
        trainer:{
          create:{}
        }
      },
      select:{
        student:true,
        firstName:true,
        lastName:true
      }
    })

    return user

  }
  return false
}

const createdStudent=async(data)=>{}
const createdTrainer=async (data)=>{

}

import jwt from "jsonwebtoken"
import { AppDataSource } from "../data-source"
import { User } from "../entities/user.entities"
import { IUser } from "./User.service"

export const loginService = async ({ email }: IUser) => {
  const userRepo = AppDataSource.getRepository(User)
  const userEmail = (await userRepo.findOne({
    where: { email: email },
  })) as User

  const token = jwt.sign(
    { email: userEmail.email, id: userEmail.id },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "48h",
      subject: userEmail.id,
    }
  )

  return { token: token }
}

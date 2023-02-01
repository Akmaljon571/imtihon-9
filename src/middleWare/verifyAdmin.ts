import { verify } from "../utils/jwt"
import { NextFunction, Request, Response } from "express"
import ErrorHandle from "../error/ErrorHandle"
import { dataSourse } from "../config"
import { Users } from "../entities/users.entite"

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { acces_token } = req.headers

    if (typeof acces_token === "string") {
      const userId = verify(acces_token)

      if (typeof userId === "string") {
        const admin: Users | null = await dataSourse.getRepository(Users).findOneBy({ user_email: userId })
        if (admin?.user_phone === "+99890823032") {
          req.userId = userId
          next()
        } else {
          throw new ErrorHandle("Not Admin", 400)
        }
      } else {
        throw new ErrorHandle("Not Token", 400)
      }
    } else {
      throw new ErrorHandle("Not Token", 400)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

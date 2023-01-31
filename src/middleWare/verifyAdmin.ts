import { verify } from "../utils/jwt"
import { NextFunction, Request, Response } from "express"
import ErrorHandle from "../error/ErrorHandle"

export default (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { acces_token } = req.headers

    if (typeof acces_token === "string") {
      const userId = verify(acces_token)

      if (typeof userId === "string") {
        req.userId = userId
        next()
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

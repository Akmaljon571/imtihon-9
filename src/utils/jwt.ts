import jwt from "jsonwebtoken"
import { KEY } from "../config"
import ErrorHandle from "../error/ErrorHandle"

export const sign = (payload: string): string | void => {
  if (KEY) return jwt.sign(payload, KEY)
}

export const verify = (token: string): string | void => {
  if (KEY)
    return jwt.verify(token, KEY, (err: unknown, data) => {
      if (err instanceof jwt.JsonWebTokenError) {
        throw new ErrorHandle("Invalid Token", 400)
      }

      return data
    })
}

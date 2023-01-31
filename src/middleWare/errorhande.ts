import { NextFunction, Request, Response } from "express"
import ErrorHandle from "../error/ErrorHandle"

export const errorhandle = (err: unknown, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof ErrorHandle) {
    res.status(err.status).json({
      message: err.message,
      status: err.status,
    })
    return
  }
  console.log(err)
  res.status(500).json({
    message: "Internal Server Error",
    status: 500,
  })
}

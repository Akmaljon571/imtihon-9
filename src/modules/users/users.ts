import { NextFunction, Request, Response } from "express"
import { dataSourse, fetchRedis } from "../../config"
import { Users } from "../../entities/users.entite"
import ErrorHandle from "../../error/ErrorHandle"
import { sign } from "../../utils/jwt"
import senMail from "../../utils/nodemailter"
import { hash, decrypt } from "../../utils/passwordHash"
import { random } from "../../utils/random"
import timeCache from "./timeCache"

export const Login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.result
    const client = await fetchRedis()
    await timeCache()

    if (typeof email === "string" && typeof password === "string") {
      const cache: string | null = await client.get("allLogin")
      if (!cache) {
        const bazaFindUser: Users | null = await dataSourse
          .getRepository(Users)
          .findOne({ where: { user_email: email } })

        if (bazaFindUser) {
          const randomSon: string = random()
          const newObj = {
            email,
            password: hash(password),
            randomSon,
          }
          await client.set("allLogin", JSON.stringify([newObj]))
          await senMail(email, randomSon)

          res.json({
            message: "Code send Mail",
            status: 200,
          })
        } else {
          throw new ErrorHandle("Not Found", 404)
        }
      } else {
        const findUsersInCache = JSON.parse(cache)

        const bazaFindUser: Users | null = await dataSourse
          .getRepository(Users)
          .findOneBy({ user_email: email, user_password: password })

        if (bazaFindUser) {
          const uniqueRandom = random()
          const newObject = {
            email,
            password,
            uniqueRandom,
          }
          await senMail(email, uniqueRandom)
          if (findUsersInCache) {
            await client.set("allLogin", JSON.stringify([...findUsersInCache, newObject]))
          } else {
            await client.set("allLogin", JSON.stringify([newObject]))
          }

          res.json({
            message: "Code send Email",
            status: 200,
          })
        } else {
          throw new ErrorHandle("Not Found", 400)
        }
      }
    } else {
      throw new ErrorHandle("Bad Request", 401)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const Registr = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, phone, email, gender, password } = req.result
    const client = await fetchRedis()
    const rasm = req.file
    await timeCache()

    if (
      typeof name === "string" &&
      typeof phone === "string" &&
      typeof email === "string" &&
      typeof gender === "boolean" &&
      typeof password === "string"
    ) {
      const bazaFindUser = await dataSourse.getRepository(Users).findOneBy({ user_email: email, user_phone: phone })

      if (!bazaFindUser) {
        const randomMail = random()
        const newObject = {
          email,
          password: hash(password),
          name,
          phone,
          gender,
          randomMail,
          rasm: rasm?.filename,
        }

        await senMail(email, randomMail)

        const cacheRegistr: string | null = await client.get("allRegistr")

        if (cacheRegistr) {
          await client.set("allRegistr", JSON.stringify([...JSON.parse(cacheRegistr), newObject]))
        } else {
          await client.set("allRegistr", JSON.stringify([newObject]))
        }

        res.json({
          message: "Code send Mail",
          status: 200,
        })
      } else {
        throw new ErrorHandle("User Already exists", 409)
      }
    } else {
      throw new ErrorHandle("Bad Request", 400)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const loginEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { emailCode } = req.result
    const client = await fetchRedis()
    const cacheLogin: string | null = await client.get("allLogin")
    if (cacheLogin) {
      const allLogin = JSON.parse(cacheLogin)

      if (allLogin.length) {
        const findUser = allLogin.find((e: any) => e.randomSon == emailCode)
        if (findUser) {
          const refreshToken = await client.get("refresh")

          if (!refreshToken) {
            await client.setEx("refresh", 3600, "1")
          }

          const setRefreshToken = await client.get("refresh")

          res.status(201).json({
            bearer_token: sign(findUser.email),
            refresh_token: refreshToken ?? setRefreshToken,
          })
        } else {
          throw new ErrorHandle("Not Found", 401)
        }
      } else {
        throw new ErrorHandle("Not Found", 401)
      }
    } else {
      throw new ErrorHandle("Not Found", 401)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const registrEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { emailCode } = req.result
    const client = await fetchRedis()
    const cacheRegistr: string | null = await client.get("allRegistr")

    if (cacheRegistr) {
      const allRegistr = JSON.parse(cacheRegistr)
      if (allRegistr.length) {
        const findUser = allRegistr.find((e: any) => e.randomMail == emailCode)

        if (findUser) {
          await dataSourse
            .getRepository(Users)
            .createQueryBuilder()
            .insert()
            .into("users")
            .values({
              user_name: findUser?.name,
              user_phone: findUser?.phone,
              user_email: findUser?.email,
              user_pol: findUser?.gender,
              user_password: findUser?.password,
              user_img: findUser?.rasm,
            })
            .execute()

          const refreshToken = await client.get("refresh")

          if (!refreshToken) {
            await client.setEx("refresh", 3600, "1")
          }

          const setRefreshToken = await client.get("refresh")

          res.status(201).json({
            bearer_token: sign(findUser?.email),
            refresh_token: refreshToken ?? setRefreshToken,
          })
        } else {
          throw new ErrorHandle("Not Found", 404)
        }
      } else {
        throw new ErrorHandle("Not Found 2", 404)
      }
    } else {
      throw new ErrorHandle("Not Found 1", 404)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}
// allLogin
// allRegistr

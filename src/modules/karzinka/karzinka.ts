import { NextFunction, Request, Response } from "express"
import { InsertResult } from "typeorm"
import { dataSourse, fetchRedis } from "../../config"
import { Karzinka } from "../../entities/karzinka.entite"
import ErrorHandle from "../../error/ErrorHandle"

export const GET = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const client = await fetchRedis()
    const cache = await client.get("allKarzinka")

    if (!cache) {
      const allKarzinka: Karzinka[] = await dataSourse.getRepository(Karzinka).find()

      res.json({
        message: "Ok",
        status: 200,
        data: allKarzinka,
      })
    } else {
      const allKarzinka: Karzinka[] = JSON.parse(cache)

      res.json({
        message: "Ok",
        status: 200,
        data: allKarzinka,
      })
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const POST = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { productId } = req.result
    const { userId } = req

    const newKarzinka: InsertResult = await dataSourse

      .getRepository(Karzinka)
      .createQueryBuilder()
      .insert()
      .into("karzinka")
      .values({ karzinka_pro: productId, karzinka_user: userId })
      .returning(["*"])
      .execute()

    res.json({
      message: "Create",
      status: 201,
      data: newKarzinka.raw[0],
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const DELETE = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    const findKarinka: Karzinka | null = await dataSourse.getRepository(Karzinka).findOneBy({ karzinka_id: id })

    if (findKarinka) {
      const deleteKarzinka = await dataSourse
        .getRepository(Karzinka)
        .createQueryBuilder()
        .delete()
        .from("karzinka")
        .where({ karzinka_id: id })
        .returning(["*"])
        .execute()

      res.json({
        message: "Delete",
        status: 204,
        data: deleteKarzinka.raw[0],
      })
    } else {
      throw new ErrorHandle("Not Found", 404)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

import { subCategory } from "../../entities/subcategory.entite"
import { NextFunction, Request, Response } from "express"
import { DeleteResult, InsertResult, UpdateResult } from "typeorm"
import { dataSourse, fetchRedis } from "../../config"
import ErrorHandle from "../../error/ErrorHandle"

export const GET = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const client = await fetchRedis()
    const cache = await client.get("allsubCategory")

    if (!cache) {
      const allsubCategory: subCategory[] = await dataSourse.getRepository(subCategory).find()

      await client.set("allsubCategory", JSON.stringify(allsubCategory))

      res.json({
        message: "Ok",
        status: 200,
        data: allsubCategory,
      })
    } else {
      const allsubCategory: subCategory[] = JSON.parse(cache)

      res.json({
        message: "Ok",
        status: 200,
        data: allsubCategory,
      })
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const POST = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, categoryId } = req.result

    if (typeof title === "string") {
      const createsubCategory: InsertResult = await dataSourse
        .getRepository(subCategory)
        .createQueryBuilder()
        .insert()
        .into("subCategory")
        .values({ sub_title: title, sub_cat: categoryId })
        .returning(["sub_id", "sub_title", "sub_cat"])
        .execute()

      res.json({
        message: "Create",
        status: 201,
        data: createsubCategory.raw[0],
      })
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const PUT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, categoryId } = req.result
    const { id } = req.params
    const findsubCategory: subCategory | null = await dataSourse.getRepository(subCategory).findOneBy({ sub_id: id })
    if (findsubCategory) {
      if (title) {
        const updatesubCategory: UpdateResult = await dataSourse
          .getRepository(subCategory)
          .createQueryBuilder()
          .update()
          .set({ sub_title: title || findsubCategory.sub_title, sub_cat: categoryId ?? findsubCategory.sub_cat })
          .where({ sub_id: id })
          .returning(["sub_id", "sub_title", "sub_cat"])
          .execute()

        res.json({
          message: "Update",
          status: 200,
          data: updatesubCategory.raw[0],
        })
      } else {
        res.json({
          message: "Update",
          status: 200,
          data: findsubCategory,
        })
      }
    } else {
      throw new ErrorHandle("Not Found", 404)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const DELETE = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    const findsubCategory: subCategory | null = await dataSourse.getRepository(subCategory).findOneBy({ sub_id: id })
    if (findsubCategory) {
      const deletesubCategory: DeleteResult = await dataSourse
        .getRepository(subCategory)
        .createQueryBuilder()
        .delete()
        .from("subCategory")
        .where({ sub_id: id })
        .returning(["sub_id", "sub_title", "sub_cat"])
        .execute()

      res.json({
        message: "Delete",
        status: 204,
        data: deletesubCategory.raw[0],
      })
    } else {
      throw new ErrorHandle("Not Found", 404)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

import { NextFunction, Request, Response } from "express"
import { DeleteResult, InsertResult, UpdateResult } from "typeorm"
import { dataSourse, fetchRedis } from "../../config"
import { Category } from "../../entities/category.entite"
import ErrorHandle from "../../error/ErrorHandle"

export const GET = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const client = await fetchRedis()
    const cache = await client.get("allCategory")

    if (!cache) {
      const allCategory: Category[] = await dataSourse.getRepository(Category).find()

      await client.set("allCategory", JSON.stringify(allCategory))

      res.json({
        message: "Ok",
        status: 200,
        data: allCategory,
      })
    } else {
      const allCategory: Category[] = JSON.parse(cache)

      res.json({
        message: "Ok",
        status: 200,
        data: allCategory,
      })
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const POST = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title } = req.result

    if (typeof title === "string") {
      const createCategory: InsertResult = await dataSourse
        .getRepository(Category)
        .createQueryBuilder()
        .insert()
        .into("category")
        .values({ cat_title: title })
        .returning(["cat_id", "cat_title"])
        .execute()

      res.json({
        message: "Create",
        status: 201,
        data: createCategory.raw[0],
      })
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const PUT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title } = req.result
    const { id } = req.params
    const findCategory: Category | null = await dataSourse.getRepository(Category).findOneBy({ cat_id: id })
    if (findCategory) {
      if (title) {
        const updateCategory: UpdateResult = await dataSourse
          .getRepository(Category)
          .createQueryBuilder()
          .update()
          .set({ cat_title: title || findCategory.cat_title })
          .where({ cat_id: id })
          .returning(["cat_id", "cat_title"])
          .execute()

        res.json({
          message: "Update",
          status: 200,
          data: updateCategory.raw[0],
        })
      } else {
        res.json({
          message: "Update",
          status: 200,
          data: findCategory,
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

    const findCategory: Category | null = await dataSourse.getRepository(Category).findOneBy({ cat_id: id })
    if (findCategory) {
      const deleteCategory: DeleteResult = await dataSourse
        .getRepository(Category)
        .createQueryBuilder()
        .delete()
        .from("category")
        .where({ cat_id: id })
        .returning(["cat_id", "cat_title"])
        .execute()

      res.json({
        message: "Delete",
        status: 204,
        data: deleteCategory.raw[0],
      })
    } else {
      throw new ErrorHandle("Not Found", 404)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

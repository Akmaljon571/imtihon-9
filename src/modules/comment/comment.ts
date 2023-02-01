import { NextFunction, Request, Response } from "express"
import { InsertResult } from "typeorm"
import { dataSourse, fetchRedis } from "../../config"
import { Comment } from "../../entities/comment.entite"
import ErrorHandle from "../../error/ErrorHandle"

export const GET = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const client = await fetchRedis()
    const cache = await client.get("allComment")

    if (!cache) {
      const allComment: Comment[] = await dataSourse.getRepository(Comment).find()

      res.json({
        message: "Ok",
        status: 200,
        data: allComment,
      })
    } else {
      const allComment: Comment[] = JSON.parse(cache)

      res.json({
        message: "Ok",
        status: 200,
        data: allComment,
      })
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const POST = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { productId, comment } = req.result
    const { userId } = req

    const newComment: InsertResult = await dataSourse

      .getRepository(Comment)
      .createQueryBuilder()
      .insert()
      .into("comment")
      .values({ comment_pro: productId, comment_user: userId, comment })
      .returning(["*"])
      .execute()

    res.json({
      message: "Create",
      status: 201,
      data: newComment.raw[0],
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const PUT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { productId, comment } = req.result
    const { id } = req.params

    const findComment = await dataSourse.getRepository(Comment).findOneBy({ comment_id: id })
    if (findComment) {
      const updateComment = await dataSourse
        .getRepository(Comment)
        .createQueryBuilder()
        .update()
        .set({ comment_pro: productId, comment })
        .where({ comment_id: id })
        .execute()

      res.json({
        message: "Update",
        status: 200,
        data: updateComment,
      })
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

    const findKarinka: Comment | null = await dataSourse.getRepository(Comment).findOneBy({ comment_id: id })

    if (findKarinka) {
      const deleteComment = await dataSourse
        .getRepository(Comment)
        .createQueryBuilder()
        .delete()
        .from("comment")
        .where({ comment_id: id })
        .returning(["*"])
        .execute()

      res.json({
        message: "Delete",
        status: 204,
        data: deleteComment.raw[0],
      })
    } else {
      throw new ErrorHandle("Not Found", 404)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

import { Product } from "./product.entite"
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Users } from "./users.entite"

@Entity()
export class Likes {
  @PrimaryGeneratedColumn("uuid")
  like_id: string

  @ManyToOne(() => Product, (like_pro) => like_pro.pro_id)
  like_pro: string

  @ManyToOne(() => Users, (like_user) => like_user.user_id)
  like_user: string
}

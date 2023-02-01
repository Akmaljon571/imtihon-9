import { Product } from "./product.entite"
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Users } from "./users.entite"

@Entity()
export class Likes {
  @PrimaryGeneratedColumn("uuid")
  like_id: string

  @OneToOne(() => Product, (like_pro) => like_pro.pro_id)
  @JoinColumn()
  like_pro: Product

  @OneToOne(() => Users, (like_user) => like_user.user_id)
  @JoinColumn()
  like_user: Users
}

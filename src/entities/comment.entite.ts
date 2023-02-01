import { Product } from "./product.entite"
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Users } from "./users.entite"

@Entity()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  comment_id: string

  @OneToOne(() => Product, (comment_pro) => comment_pro.pro_id)
  @JoinColumn()
  comment_pro: string

  @OneToOne(() => Users, (comment_user) => comment_user.user_id)
  @JoinColumn()
  comment_user: Users

  @Column({
    type: "character varying",
    nullable: false,
  })
  comment: string
}

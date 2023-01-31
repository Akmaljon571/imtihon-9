import { Product } from "./product.entite"
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Users } from "./users.entite"

@Entity()
export class Karzinka {
  @PrimaryGeneratedColumn("uuid")
  karzinka_id: string

  @ManyToOne(() => Product, (karzinka_pro) => karzinka_pro.pro_id)
  karzinka_pro: string

  @ManyToOne(() => Users, (karzinka_user) => karzinka_user.user_id)
  karzinka_user: string
}

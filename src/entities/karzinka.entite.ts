import { Product } from "./product.entite"
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Users } from "./users.entite"

@Entity()
export class Karzinka {
  @PrimaryGeneratedColumn("uuid")
  karzinka_id: string

  @OneToOne(() => Product, (karzinka_pro) => karzinka_pro.pro_id)
  @JoinColumn()
  karzinka_pro: Product

  @OneToOne(() => Users, (karzinka_user) => karzinka_user.user_id)
  @JoinColumn()
  karzinka_user: Users
}

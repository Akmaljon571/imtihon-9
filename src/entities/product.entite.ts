import { subCategory } from "./subcategory.entite"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  pro_id: string

  @Column({
    type: "character varying",
    length: 50,
    nullable: false,
  })
  pro_name: string

  @Column({
    type: "integer",
    nullable: false,
  })
  pro_price: number

  @Column({
    type: "character varying",
    nullable: false,
  })
  pro_img1: string

  @Column({
    type: "character varying",
    nullable: false,
  })
  pro_img2: string

  @Column({
    type: "character varying",
  })
  pro_razmer: string

  @Column({
    type: "boolean",
  })
  pro_pol: boolean

  @Column({
    type: "character varying",
  })
  pro_after: string

  @Column({
    type: "character varying",
  })
  pro_in: string

  @Column({
    type: "character varying",
  })
  pro_langu: string

  @ManyToOne(() => subCategory, (pro_sub) => pro_sub.sub_id)
  pro_sub: string
}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Category } from "./category.entite"

@Entity()
export class subCategory {
  @PrimaryGeneratedColumn("uuid")
  sub_id: string

  @Column({
    type: "character varying",
    length: 100,
    nullable: false,
  })
  sub_title: string

  @OneToMany(() => Category, (sub_cat) => sub_cat.cat_id)
  sub_cat: string
}

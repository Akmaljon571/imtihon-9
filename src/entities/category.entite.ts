import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Category {
  @PrimaryGeneratedColumn("uuid")
  cat_id: string

  @Column({
    type: "character varying",
    length: 100,
    nullable: false,
  })
  cat_title: string
}

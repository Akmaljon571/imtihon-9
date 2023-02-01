import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675213777140 implements MigrationInterface {
    name = 'table1675213777140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub_category" DROP CONSTRAINT "FK_6c7c8a76391271a7c1da862802e"`);
        await queryRunner.query(`CREATE TABLE "comment" ("comment_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" character varying NOT NULL, "commentProProId" uuid, "commentUserUserId" uuid, CONSTRAINT "REL_820918990d46e88745b4ec15ed" UNIQUE ("commentProProId"), CONSTRAINT "REL_b49e6b02fd01ba7e93dc303b97" UNIQUE ("commentUserUserId"), CONSTRAINT "PK_6a9f9bf1cf9a09107d3224a0e9a" PRIMARY KEY ("comment_id"))`);
        await queryRunner.query(`ALTER TABLE "sub_category" DROP CONSTRAINT "UQ_6c7c8a76391271a7c1da862802e"`);
        await queryRunner.query(`ALTER TABLE "sub_category" DROP COLUMN "subCatCatId"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_820918990d46e88745b4ec15edc" FOREIGN KEY ("commentProProId") REFERENCES "product"("pro_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_b49e6b02fd01ba7e93dc303b975" FOREIGN KEY ("commentUserUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_b49e6b02fd01ba7e93dc303b975"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_820918990d46e88745b4ec15edc"`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD "subCatCatId" uuid`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD CONSTRAINT "UQ_6c7c8a76391271a7c1da862802e" UNIQUE ("subCatCatId")`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD CONSTRAINT "FK_6c7c8a76391271a7c1da862802e" FOREIGN KEY ("subCatCatId") REFERENCES "category"("cat_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

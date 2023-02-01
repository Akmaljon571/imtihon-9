import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675211248780 implements MigrationInterface {
    name = 'table1675211248780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub_category" DROP CONSTRAINT "FK_6c7c8a76391271a7c1da862802e"`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD CONSTRAINT "UQ_6c7c8a76391271a7c1da862802e" UNIQUE ("subCatCatId")`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD CONSTRAINT "FK_6c7c8a76391271a7c1da862802e" FOREIGN KEY ("subCatCatId") REFERENCES "category"("cat_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub_category" DROP CONSTRAINT "FK_6c7c8a76391271a7c1da862802e"`);
        await queryRunner.query(`ALTER TABLE "sub_category" DROP CONSTRAINT "UQ_6c7c8a76391271a7c1da862802e"`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD CONSTRAINT "FK_6c7c8a76391271a7c1da862802e" FOREIGN KEY ("subCatCatId") REFERENCES "category"("cat_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}

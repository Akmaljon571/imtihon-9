import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675209168204 implements MigrationInterface {
    name = 'table1675209168204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub_category" ADD "subCatCatId" uuid`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD CONSTRAINT "UQ_6c7c8a76391271a7c1da862802e" UNIQUE ("subCatCatId")`);
        await queryRunner.query(`ALTER TABLE "karzinka" ADD "karzinkaProProId" uuid`);
        await queryRunner.query(`ALTER TABLE "karzinka" ADD CONSTRAINT "UQ_0db5c27c7a4408b3fffe9588147" UNIQUE ("karzinkaProProId")`);
        await queryRunner.query(`ALTER TABLE "karzinka" ADD "karzinkaUserUserId" uuid`);
        await queryRunner.query(`ALTER TABLE "karzinka" ADD CONSTRAINT "UQ_21e6b9bead2d43a1cc883578be1" UNIQUE ("karzinkaUserUserId")`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "likeProProId" uuid`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "UQ_2842790292947c32731cfb9958f" UNIQUE ("likeProProId")`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "likeUserUserId" uuid`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "UQ_ffbb7aed26f72d566a4f383d4c4" UNIQUE ("likeUserUserId")`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD CONSTRAINT "FK_6c7c8a76391271a7c1da862802e" FOREIGN KEY ("subCatCatId") REFERENCES "category"("cat_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "karzinka" ADD CONSTRAINT "FK_0db5c27c7a4408b3fffe9588147" FOREIGN KEY ("karzinkaProProId") REFERENCES "product"("pro_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "karzinka" ADD CONSTRAINT "FK_21e6b9bead2d43a1cc883578be1" FOREIGN KEY ("karzinkaUserUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_2842790292947c32731cfb9958f" FOREIGN KEY ("likeProProId") REFERENCES "product"("pro_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_ffbb7aed26f72d566a4f383d4c4" FOREIGN KEY ("likeUserUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_ffbb7aed26f72d566a4f383d4c4"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_2842790292947c32731cfb9958f"`);
        await queryRunner.query(`ALTER TABLE "karzinka" DROP CONSTRAINT "FK_21e6b9bead2d43a1cc883578be1"`);
        await queryRunner.query(`ALTER TABLE "karzinka" DROP CONSTRAINT "FK_0db5c27c7a4408b3fffe9588147"`);
        await queryRunner.query(`ALTER TABLE "sub_category" DROP CONSTRAINT "FK_6c7c8a76391271a7c1da862802e"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "UQ_ffbb7aed26f72d566a4f383d4c4"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "likeUserUserId"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "UQ_2842790292947c32731cfb9958f"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "likeProProId"`);
        await queryRunner.query(`ALTER TABLE "karzinka" DROP CONSTRAINT "UQ_21e6b9bead2d43a1cc883578be1"`);
        await queryRunner.query(`ALTER TABLE "karzinka" DROP COLUMN "karzinkaUserUserId"`);
        await queryRunner.query(`ALTER TABLE "karzinka" DROP CONSTRAINT "UQ_0db5c27c7a4408b3fffe9588147"`);
        await queryRunner.query(`ALTER TABLE "karzinka" DROP COLUMN "karzinkaProProId"`);
        await queryRunner.query(`ALTER TABLE "sub_category" DROP CONSTRAINT "UQ_6c7c8a76391271a7c1da862802e"`);
        await queryRunner.query(`ALTER TABLE "sub_category" DROP COLUMN "subCatCatId"`);
    }

}

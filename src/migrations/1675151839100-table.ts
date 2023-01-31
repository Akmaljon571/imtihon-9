import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675151839100 implements MigrationInterface {
    name = 'table1675151839100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("cat_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cat_title" character varying(100) NOT NULL, CONSTRAINT "PK_d6317b6c2abd9293df82afc80f6" PRIMARY KEY ("cat_id"))`);
        await queryRunner.query(`CREATE TABLE "sub_category" ("sub_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sub_title" character varying(100) NOT NULL, CONSTRAINT "PK_9093d2b6ef348c9e323b3673cb1" PRIMARY KEY ("sub_id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("pro_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "pro_name" character varying(50) NOT NULL, "pro_price" integer NOT NULL, "pro_img1" character varying NOT NULL, "pro_img2" character varying NOT NULL, "pro_razmer" character varying NOT NULL, "pro_pol" boolean NOT NULL, "pro_after" character varying NOT NULL, "pro_in" character varying NOT NULL, "pro_langu" character varying NOT NULL, "proSubSubId" uuid, CONSTRAINT "PK_c66fe6f513906a9622b575e753b" PRIMARY KEY ("pro_id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_name" character varying(50) NOT NULL, "user_img" character varying NOT NULL, "user_phone" character varying NOT NULL, "user_email" character varying NOT NULL, "user_pol" boolean NOT NULL DEFAULT true, "user_password" character varying(13) NOT NULL, CONSTRAINT "UQ_e5ba3eae441160d91a30fe89096" UNIQUE ("user_phone"), CONSTRAINT "UQ_643a0bfb9391001cf11e581bdd6" UNIQUE ("user_email"), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "likes" ("like_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "likeProProId" uuid, "likeUserUserId" uuid, CONSTRAINT "PK_4b698ab917e6a07411bb250e597" PRIMARY KEY ("like_id"))`);
        await queryRunner.query(`CREATE TABLE "karzinka" ("karzinka_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "karzinkaProProId" uuid, "karzinkaUserUserId" uuid, CONSTRAINT "PK_7ad6974157fef5fa26536e1352b" PRIMARY KEY ("karzinka_id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_9dc36ce5e1c471e09d7f986b782" FOREIGN KEY ("proSubSubId") REFERENCES "sub_category"("sub_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_2842790292947c32731cfb9958f" FOREIGN KEY ("likeProProId") REFERENCES "product"("pro_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_ffbb7aed26f72d566a4f383d4c4" FOREIGN KEY ("likeUserUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "karzinka" ADD CONSTRAINT "FK_0db5c27c7a4408b3fffe9588147" FOREIGN KEY ("karzinkaProProId") REFERENCES "product"("pro_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "karzinka" ADD CONSTRAINT "FK_21e6b9bead2d43a1cc883578be1" FOREIGN KEY ("karzinkaUserUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "karzinka" DROP CONSTRAINT "FK_21e6b9bead2d43a1cc883578be1"`);
        await queryRunner.query(`ALTER TABLE "karzinka" DROP CONSTRAINT "FK_0db5c27c7a4408b3fffe9588147"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_ffbb7aed26f72d566a4f383d4c4"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_2842790292947c32731cfb9958f"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_9dc36ce5e1c471e09d7f986b782"`);
        await queryRunner.query(`DROP TABLE "karzinka"`);
        await queryRunner.query(`DROP TABLE "likes"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "sub_category"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}

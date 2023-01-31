import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675189815841 implements MigrationInterface {
    name = 'table1675189815841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "user_password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "user_password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "user_password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "user_password" character varying(13) NOT NULL`);
    }

}

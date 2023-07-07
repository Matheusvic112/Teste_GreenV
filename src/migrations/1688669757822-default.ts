import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1688669757822 implements MigrationInterface {
    name = 'Default1688669757822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ADD "createdBy" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "createdBy"`);
    }

}

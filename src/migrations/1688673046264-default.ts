import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1688673046264 implements MigrationInterface {
    name = 'Default1688673046264'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "veiculos" ADD "createdBy" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "veiculos" DROP COLUMN "createdBy"`);
    }

}

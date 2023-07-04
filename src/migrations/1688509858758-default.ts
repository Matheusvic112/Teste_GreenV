import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1688509858758 implements MigrationInterface {
    name = 'Default1688509858758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "veiculos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying(100) NOT NULL, "model" character varying(100) NOT NULL, "year" character varying(4) NOT NULL, "plate" character varying(20) NOT NULL, "rented" boolean NOT NULL DEFAULT true, "companiesId" uuid, CONSTRAINT "PK_0c3daa1e5d16914bd9e7777cf77" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "cpf" character varying NOT NULL, "password" character varying NOT NULL, "companies_id" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "companies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "cnpj" character varying NOT NULL, CONSTRAINT "UQ_d0af6f5866201d5cb424767744a" UNIQUE ("email"), CONSTRAINT "UQ_d477050c058ca769d3808caef51" UNIQUE ("phone"), CONSTRAINT "UQ_703760d095b8e399e34950f4960" UNIQUE ("cnpj"), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "veiculos_users_users" ("veiculosId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_0ccf4a8537492bdefeee64e764b" PRIMARY KEY ("veiculosId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_23b0355c028ea2f0ad64d5def8" ON "veiculos_users_users" ("veiculosId") `);
        await queryRunner.query(`CREATE INDEX "IDX_01db6f5bafa03f3d8a64131b5c" ON "veiculos_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "veiculos" ADD CONSTRAINT "FK_4864dc7d362e69b030a69e81885" FOREIGN KEY ("companiesId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_73b8247d09e25f36310a1bd67d5" FOREIGN KEY ("companies_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "veiculos_users_users" ADD CONSTRAINT "FK_23b0355c028ea2f0ad64d5def84" FOREIGN KEY ("veiculosId") REFERENCES "veiculos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "veiculos_users_users" ADD CONSTRAINT "FK_01db6f5bafa03f3d8a64131b5c2" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "veiculos_users_users" DROP CONSTRAINT "FK_01db6f5bafa03f3d8a64131b5c2"`);
        await queryRunner.query(`ALTER TABLE "veiculos_users_users" DROP CONSTRAINT "FK_23b0355c028ea2f0ad64d5def84"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_73b8247d09e25f36310a1bd67d5"`);
        await queryRunner.query(`ALTER TABLE "veiculos" DROP CONSTRAINT "FK_4864dc7d362e69b030a69e81885"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_01db6f5bafa03f3d8a64131b5c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_23b0355c028ea2f0ad64d5def8"`);
        await queryRunner.query(`DROP TABLE "veiculos_users_users"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "veiculos"`);
    }

}

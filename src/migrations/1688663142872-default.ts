import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1688663142872 implements MigrationInterface {
    name = 'Default1688663142872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "companies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "cnpj" character varying NOT NULL, CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "cpf" character varying NOT NULL, "password" character varying NOT NULL, "companiesId" uuid, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "veiculos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying(100) NOT NULL, "model" character varying(100) NOT NULL, "year" character varying(4) NOT NULL, "plate" character varying(20) NOT NULL, "companies_name" uuid, "usersId" uuid, CONSTRAINT "PK_0c3daa1e5d16914bd9e7777cf77" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_34e6ff378f992f78209b9a96e41" FOREIGN KEY ("companiesId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "veiculos" ADD CONSTRAINT "FK_ebb46b7722cb26be2a471beed6f" FOREIGN KEY ("companies_name") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "veiculos" ADD CONSTRAINT "FK_6029e0b100c3eed6423e4a17083" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "veiculos" DROP CONSTRAINT "FK_6029e0b100c3eed6423e4a17083"`);
        await queryRunner.query(`ALTER TABLE "veiculos" DROP CONSTRAINT "FK_ebb46b7722cb26be2a471beed6f"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_34e6ff378f992f78209b9a96e41"`);
        await queryRunner.query(`DROP TABLE "veiculos"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "companies"`);
    }

}

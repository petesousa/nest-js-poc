import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUser1627862488643 implements MigrationInterface {
  name = 'AddUser1627862488643';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying(24) NOT NULL, "email" character varying(75) NOT NULL, "firstName" character varying(24) NOT NULL, "lastName" character varying(24) NOT NULL, "status" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}

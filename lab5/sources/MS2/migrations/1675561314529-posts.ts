import { MigrationInterface, QueryRunner } from "typeorm";

export class posts1675561314529 implements MigrationInterface {
    name = 'posts1675561314529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`);
        await queryRunner.query(`DROP TABLE "posts"`);
    }

}

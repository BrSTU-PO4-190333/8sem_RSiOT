import { MigrationInterface, QueryRunner } from "typeorm";

export class postComments1675561383222 implements MigrationInterface {
    name = 'postComments1675561383222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "postComments" ("id" SERIAL NOT NULL, "commentatorId" integer NOT NULL, "postId" integer NOT NULL, "message" character varying NOT NULL, CONSTRAINT "PK_2a435e7782859bb301cf07e6a50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "postComments" ADD CONSTRAINT "FK_9ee108dd7a93a84f2b516177b9d" FOREIGN KEY ("commentatorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "postComments" ADD CONSTRAINT "FK_3e81ef6f8d912fa1e62ac7ca88a" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "postComments" DROP CONSTRAINT "FK_3e81ef6f8d912fa1e62ac7ca88a"`);
        await queryRunner.query(`ALTER TABLE "postComments" DROP CONSTRAINT "FK_9ee108dd7a93a84f2b516177b9d"`);
        await queryRunner.query(`DROP TABLE "postComments"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTags1784106894287 implements MigrationInterface {
    name = 'AddTags1784106894287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" character varying(50) NOT NULL, CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task_tags" ("tasksId" uuid NOT NULL, "tagsId" uuid NOT NULL, CONSTRAINT "PK_84acdf1afbf5da45482c260c591" PRIMARY KEY ("tasksId", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_133800413d8594e69e3c449ba2" ON "task_tags"  ("tasksId") `);
        await queryRunner.query(`CREATE INDEX "IDX_858daeb22a80374e11b779fc72" ON "task_tags"  ("tagsId") `);
        await queryRunner.query(`ALTER TABLE "task_tags" ADD CONSTRAINT "FK_133800413d8594e69e3c449ba2d" FOREIGN KEY ("tasksId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "task_tags" ADD CONSTRAINT "FK_858daeb22a80374e11b779fc72a" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_tags" DROP CONSTRAINT "FK_858daeb22a80374e11b779fc72a"`);
        await queryRunner.query(`ALTER TABLE "task_tags" DROP CONSTRAINT "FK_133800413d8594e69e3c449ba2d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_858daeb22a80374e11b779fc72"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_133800413d8594e69e3c449ba2"`);
        await queryRunner.query(`DROP TABLE "task_tags"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTaskDetails1784198766481 implements MigrationInterface {
    name = 'AddTaskDetails1784198766481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task_details" ("taskId" uuid NOT NULL, "description" text NOT NULL, "materialsUrl" character varying(255), CONSTRAINT "PK_b639ec76f465c9c0b23211deb23" PRIMARY KEY ("taskId"))`);
        await queryRunner.query(`ALTER TABLE "task_details" ADD CONSTRAINT "FK_b639ec76f465c9c0b23211deb23" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_details" DROP CONSTRAINT "FK_b639ec76f465c9c0b23211deb23"`);
        await queryRunner.query(`DROP TABLE "task_details"`);
    }

}

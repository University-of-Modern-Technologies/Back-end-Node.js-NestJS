import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTaskCreatedAt1784212619241 implements MigrationInterface {
    name = 'AddTaskCreatedAt1784212619241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "createdAt"`);
    }

}

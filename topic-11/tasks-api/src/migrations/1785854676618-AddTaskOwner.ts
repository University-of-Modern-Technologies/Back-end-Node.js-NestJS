import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTaskOwner1785854676618 implements MigrationInterface {
    name = 'AddTaskOwner1785854676618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "ownerId" uuid`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_607de52438268ab19a406349427" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_607de52438268ab19a406349427"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "ownerId"`);
    }

}

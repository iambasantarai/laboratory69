import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePostsTable1744908651605 implements MigrationInterface {
    name = 'CreatePostsTable1744908651605'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "post_id" character varying NOT NULL, "thread" jsonb DEFAULT '{}', "url" text NOT NULL, "ord_in_thread" integer NOT NULL, "parent_url" text, "author" character varying, "published" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" text NOT NULL, "text" text, "highlight_title" text NOT NULL, "highlight_text" text NOT NULL, "highlight_thread_title" text NOT NULL, "language" character varying NOT NULL, "sentiment" character varying NOT NULL, "categories" text array NOT NULL DEFAULT '{}', "external_links" text array NOT NULL DEFAULT '{}', "external_images" text array NOT NULL DEFAULT '{}', "entities" jsonb DEFAULT '{}', "crawled" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "post"`);
    }

}

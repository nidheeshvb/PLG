import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_group_scale_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum__pages_v_blocks_group_scale_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum_team_members_group" AS ENUM('management', 'creative', 'staff');
  CREATE TYPE "public"."enum_team_members_department" AS ENUM('top', 'commercial', 'delivery', 'operations');
  CREATE TABLE "pages_blocks_team_directory" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"intro" varchar,
  	"highlight" varchar,
  	"show_org_chart" boolean DEFAULT true,
  	"show_filter" boolean DEFAULT true,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_group_scale_chain" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "pages_blocks_group_scale" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"text" varchar,
  	"show_link" boolean DEFAULT true,
  	"link_label" varchar,
  	"link_type" "enum_pages_blocks_group_scale_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_section" varchar,
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_directory" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"intro" varchar,
  	"highlight" varchar,
  	"show_org_chart" boolean DEFAULT true,
  	"show_filter" boolean DEFAULT true,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_group_scale_chain" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_group_scale" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"text" varchar,
  	"show_link" boolean DEFAULT true,
  	"link_label" varchar,
  	"link_type" "enum__pages_v_blocks_group_scale_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_section" varchar,
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"job_title" varchar NOT NULL,
  	"photo_id" integer,
  	"group" "enum_team_members_group" DEFAULT 'staff' NOT NULL,
  	"department" "enum_team_members_department" DEFAULT 'delivery' NOT NULL,
  	"head_of_department" boolean DEFAULT false,
  	"account_owner" boolean DEFAULT false,
  	"bio" varchar,
  	"linkedin" varchar,
  	"instagram" varchar,
  	"x" varchar,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "larger_on_phones" boolean DEFAULT false;
  ALTER TABLE "pages_rels" ADD COLUMN "team_members_id" integer;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "larger_on_phones" boolean DEFAULT false;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "team_members_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "team_members_id" integer;
  ALTER TABLE "pages_blocks_team_directory" ADD CONSTRAINT "pages_blocks_team_directory_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_group_scale_chain" ADD CONSTRAINT "pages_blocks_group_scale_chain_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_group_scale"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_group_scale" ADD CONSTRAINT "pages_blocks_group_scale_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_group_scale" ADD CONSTRAINT "pages_blocks_group_scale_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_directory" ADD CONSTRAINT "_pages_v_blocks_team_directory_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_group_scale_chain" ADD CONSTRAINT "_pages_v_blocks_group_scale_chain_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_group_scale"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_group_scale" ADD CONSTRAINT "_pages_v_blocks_group_scale_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_group_scale" ADD CONSTRAINT "_pages_v_blocks_group_scale_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_team_directory_order_idx" ON "pages_blocks_team_directory" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_directory_parent_id_idx" ON "pages_blocks_team_directory" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_directory_path_idx" ON "pages_blocks_team_directory" USING btree ("_path");
  CREATE INDEX "pages_blocks_group_scale_chain_order_idx" ON "pages_blocks_group_scale_chain" USING btree ("_order");
  CREATE INDEX "pages_blocks_group_scale_chain_parent_id_idx" ON "pages_blocks_group_scale_chain" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_group_scale_order_idx" ON "pages_blocks_group_scale" USING btree ("_order");
  CREATE INDEX "pages_blocks_group_scale_parent_id_idx" ON "pages_blocks_group_scale" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_group_scale_path_idx" ON "pages_blocks_group_scale" USING btree ("_path");
  CREATE INDEX "pages_blocks_group_scale_link_link_page_idx" ON "pages_blocks_group_scale" USING btree ("link_page_id");
  CREATE INDEX "_pages_v_blocks_team_directory_order_idx" ON "_pages_v_blocks_team_directory" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_directory_parent_id_idx" ON "_pages_v_blocks_team_directory" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_directory_path_idx" ON "_pages_v_blocks_team_directory" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_group_scale_chain_order_idx" ON "_pages_v_blocks_group_scale_chain" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_group_scale_chain_parent_id_idx" ON "_pages_v_blocks_group_scale_chain" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_group_scale_order_idx" ON "_pages_v_blocks_group_scale" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_group_scale_parent_id_idx" ON "_pages_v_blocks_group_scale" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_group_scale_path_idx" ON "_pages_v_blocks_group_scale" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_group_scale_link_link_page_idx" ON "_pages_v_blocks_group_scale" USING btree ("link_page_id");
  CREATE INDEX "team_members_photo_idx" ON "team_members" USING btree ("photo_id");
  CREATE INDEX "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_team_members_id_idx" ON "pages_rels" USING btree ("team_members_id");
  CREATE INDEX "_pages_v_rels_team_members_id_idx" ON "_pages_v_rels" USING btree ("team_members_id");
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_team_directory" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_group_scale_chain" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_group_scale" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_team_directory" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_group_scale_chain" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_group_scale" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team_members" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_team_directory" CASCADE;
  DROP TABLE "pages_blocks_group_scale_chain" CASCADE;
  DROP TABLE "pages_blocks_group_scale" CASCADE;
  DROP TABLE "_pages_v_blocks_team_directory" CASCADE;
  DROP TABLE "_pages_v_blocks_group_scale_chain" CASCADE;
  DROP TABLE "_pages_v_blocks_group_scale" CASCADE;
  DROP TABLE "team_members" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_team_members_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_team_members_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_team_members_fk";
  
  DROP INDEX "pages_rels_team_members_id_idx";
  DROP INDEX "_pages_v_rels_team_members_id_idx";
  DROP INDEX "payload_locked_documents_rels_team_members_id_idx";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "larger_on_phones";
  ALTER TABLE "pages_rels" DROP COLUMN "team_members_id";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "larger_on_phones";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "team_members_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "team_members_id";
  DROP TYPE "public"."enum_pages_blocks_group_scale_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_group_scale_link_type";
  DROP TYPE "public"."enum_team_members_group";
  DROP TYPE "public"."enum_team_members_department";`)
}

import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_open_roles_footer_link_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_open_roles_footer_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum_pages_blocks_statement_style" AS ENUM('centered', 'band');
  CREATE TYPE "public"."enum__pages_v_blocks_open_roles_footer_link_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_open_roles_footer_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum__pages_v_blocks_statement_style" AS ENUM('centered', 'band');
  CREATE TYPE "public"."enum_roles_team" AS ENUM('commercial', 'delivery', 'creative', 'analytics');
  CREATE TYPE "public"."enum_roles_employment_type" AS ENUM('fullTime', 'partTime', 'contract', 'internship');
  ALTER TYPE "public"."enum_pages_blocks_lead_text_highlight_mode" ADD VALUE 'phrase';
  ALTER TYPE "public"."enum_pages_blocks_lead_text_diagram" ADD VALUE 'cross';
  ALTER TYPE "public"."enum_pages_blocks_form_form_type" ADD VALUE 'application';
  ALTER TYPE "public"."enum__pages_v_blocks_lead_text_highlight_mode" ADD VALUE 'phrase';
  ALTER TYPE "public"."enum__pages_v_blocks_lead_text_diagram" ADD VALUE 'cross';
  ALTER TYPE "public"."enum__pages_v_blocks_form_form_type" ADD VALUE 'application';
  CREATE TABLE "pages_blocks_lead_text_cross_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"name" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_lead_text_details_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"tag" varchar,
  	"highlight" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_open_roles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"gradient_title" boolean DEFAULT true,
  	"show_filter" boolean DEFAULT true,
  	"apply_label" varchar DEFAULT 'Apply for this role',
  	"apply_section" varchar DEFAULT 'apply',
  	"empty_text" varchar DEFAULT 'No open roles right now. Send us your profile and we’ll keep it on file.',
  	"footer_text" varchar,
  	"footer_link_label" varchar,
  	"footer_link_appearance" "enum_pages_blocks_open_roles_footer_link_appearance" DEFAULT 'primary',
  	"footer_link_type" "enum_pages_blocks_open_roles_footer_link_type" DEFAULT 'page',
  	"footer_link_page_id" integer,
  	"footer_link_section" varchar,
  	"footer_link_url" varchar,
  	"footer_link_new_tab" boolean,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lead_text_cross_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"name" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lead_text_details_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"tag" varchar,
  	"highlight" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_open_roles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"gradient_title" boolean DEFAULT true,
  	"show_filter" boolean DEFAULT true,
  	"apply_label" varchar DEFAULT 'Apply for this role',
  	"apply_section" varchar DEFAULT 'apply',
  	"empty_text" varchar DEFAULT 'No open roles right now. Send us your profile and we’ll keep it on file.',
  	"footer_text" varchar,
  	"footer_link_label" varchar,
  	"footer_link_appearance" "enum__pages_v_blocks_open_roles_footer_link_appearance" DEFAULT 'primary',
  	"footer_link_type" "enum__pages_v_blocks_open_roles_footer_link_type" DEFAULT 'page',
  	"footer_link_page_id" integer,
  	"footer_link_section" varchar,
  	"footer_link_url" varchar,
  	"footer_link_new_tab" boolean,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "roles_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "roles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"team" "enum_roles_team" DEFAULT 'commercial' NOT NULL,
  	"location" varchar DEFAULT 'Dubai, UAE' NOT NULL,
  	"employment_type" "enum_roles_employment_type" DEFAULT 'fullTime' NOT NULL,
  	"summary" varchar,
  	"is_open" boolean DEFAULT true,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "pages_blocks_lead_text" ADD COLUMN "show_details" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_lead_text" ADD COLUMN "details_heading" varchar;
  ALTER TABLE "pages_blocks_lead_text" ADD COLUMN "details_text" varchar;
  ALTER TABLE "pages_blocks_statement" ADD COLUMN "style" "enum_pages_blocks_statement_style" DEFAULT 'centered';
  ALTER TABLE "pages_blocks_statement" ADD COLUMN "highlight" varchar;
  ALTER TABLE "pages_blocks_form" ADD COLUMN "note" varchar;
  ALTER TABLE "pages_rels" ADD COLUMN "roles_id" integer;
  ALTER TABLE "_pages_v_blocks_lead_text" ADD COLUMN "show_details" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_lead_text" ADD COLUMN "details_heading" varchar;
  ALTER TABLE "_pages_v_blocks_lead_text" ADD COLUMN "details_text" varchar;
  ALTER TABLE "_pages_v_blocks_statement" ADD COLUMN "style" "enum__pages_v_blocks_statement_style" DEFAULT 'centered';
  ALTER TABLE "_pages_v_blocks_statement" ADD COLUMN "highlight" varchar;
  ALTER TABLE "_pages_v_blocks_form" ADD COLUMN "note" varchar;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "roles_id" integer;
  ALTER TABLE "form_submissions" ADD COLUMN "role" varchar;
  ALTER TABLE "form_submissions" ADD COLUMN "discipline" varchar;
  ALTER TABLE "form_submissions" ADD COLUMN "profile_link" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "roles_id" integer;
  ALTER TABLE "pages_blocks_lead_text_cross_items" ADD CONSTRAINT "pages_blocks_lead_text_cross_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lead_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lead_text_details_list" ADD CONSTRAINT "pages_blocks_lead_text_details_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lead_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_open_roles" ADD CONSTRAINT "pages_blocks_open_roles_footer_link_page_id_pages_id_fk" FOREIGN KEY ("footer_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_open_roles" ADD CONSTRAINT "pages_blocks_open_roles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lead_text_cross_items" ADD CONSTRAINT "_pages_v_blocks_lead_text_cross_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lead_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lead_text_details_list" ADD CONSTRAINT "_pages_v_blocks_lead_text_details_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lead_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_open_roles" ADD CONSTRAINT "_pages_v_blocks_open_roles_footer_link_page_id_pages_id_fk" FOREIGN KEY ("footer_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_open_roles" ADD CONSTRAINT "_pages_v_blocks_open_roles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "roles_points" ADD CONSTRAINT "roles_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_lead_text_cross_items_order_idx" ON "pages_blocks_lead_text_cross_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_lead_text_cross_items_parent_id_idx" ON "pages_blocks_lead_text_cross_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lead_text_details_list_order_idx" ON "pages_blocks_lead_text_details_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_lead_text_details_list_parent_id_idx" ON "pages_blocks_lead_text_details_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_open_roles_order_idx" ON "pages_blocks_open_roles" USING btree ("_order");
  CREATE INDEX "pages_blocks_open_roles_parent_id_idx" ON "pages_blocks_open_roles" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_open_roles_path_idx" ON "pages_blocks_open_roles" USING btree ("_path");
  CREATE INDEX "pages_blocks_open_roles_footer_link_footer_link_page_idx" ON "pages_blocks_open_roles" USING btree ("footer_link_page_id");
  CREATE INDEX "_pages_v_blocks_lead_text_cross_items_order_idx" ON "_pages_v_blocks_lead_text_cross_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lead_text_cross_items_parent_id_idx" ON "_pages_v_blocks_lead_text_cross_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lead_text_details_list_order_idx" ON "_pages_v_blocks_lead_text_details_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lead_text_details_list_parent_id_idx" ON "_pages_v_blocks_lead_text_details_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_open_roles_order_idx" ON "_pages_v_blocks_open_roles" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_open_roles_parent_id_idx" ON "_pages_v_blocks_open_roles" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_open_roles_path_idx" ON "_pages_v_blocks_open_roles" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_open_roles_footer_link_footer_link_page_idx" ON "_pages_v_blocks_open_roles" USING btree ("footer_link_page_id");
  CREATE INDEX "roles_points_order_idx" ON "roles_points" USING btree ("_order");
  CREATE INDEX "roles_points_parent_id_idx" ON "roles_points" USING btree ("_parent_id");
  CREATE INDEX "roles_updated_at_idx" ON "roles" USING btree ("updated_at");
  CREATE INDEX "roles_created_at_idx" ON "roles" USING btree ("created_at");
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_roles_fk" FOREIGN KEY ("roles_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_roles_fk" FOREIGN KEY ("roles_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_roles_fk" FOREIGN KEY ("roles_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_roles_id_idx" ON "pages_rels" USING btree ("roles_id");
  CREATE INDEX "_pages_v_rels_roles_id_idx" ON "_pages_v_rels" USING btree ("roles_id");
  CREATE INDEX "payload_locked_documents_rels_roles_id_idx" ON "payload_locked_documents_rels" USING btree ("roles_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_lead_text_cross_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_lead_text_details_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_open_roles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_lead_text_cross_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_lead_text_details_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_open_roles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "roles_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "roles" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_lead_text_cross_items" CASCADE;
  DROP TABLE "pages_blocks_lead_text_details_list" CASCADE;
  DROP TABLE "pages_blocks_open_roles" CASCADE;
  DROP TABLE "_pages_v_blocks_lead_text_cross_items" CASCADE;
  DROP TABLE "_pages_v_blocks_lead_text_details_list" CASCADE;
  DROP TABLE "_pages_v_blocks_open_roles" CASCADE;
  DROP TABLE "roles_points" CASCADE;
  DROP TABLE "roles" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_roles_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_roles_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_roles_fk";
  
  ALTER TABLE "pages_blocks_lead_text" ALTER COLUMN "highlight_mode" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_lead_text" ALTER COLUMN "highlight_mode" SET DEFAULT 'tail'::text;
  DROP TYPE "public"."enum_pages_blocks_lead_text_highlight_mode";
  CREATE TYPE "public"."enum_pages_blocks_lead_text_highlight_mode" AS ENUM('none', 'tail', 'words');
  ALTER TABLE "pages_blocks_lead_text" ALTER COLUMN "highlight_mode" SET DEFAULT 'tail'::"public"."enum_pages_blocks_lead_text_highlight_mode";
  ALTER TABLE "pages_blocks_lead_text" ALTER COLUMN "highlight_mode" SET DATA TYPE "public"."enum_pages_blocks_lead_text_highlight_mode" USING "highlight_mode"::"public"."enum_pages_blocks_lead_text_highlight_mode";
  ALTER TABLE "pages_blocks_lead_text" ALTER COLUMN "diagram" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_lead_text" ALTER COLUMN "diagram" SET DEFAULT 'none'::text;
  DROP TYPE "public"."enum_pages_blocks_lead_text_diagram";
  CREATE TYPE "public"."enum_pages_blocks_lead_text_diagram" AS ENUM('none', 'merge', 'weave');
  ALTER TABLE "pages_blocks_lead_text" ALTER COLUMN "diagram" SET DEFAULT 'none'::"public"."enum_pages_blocks_lead_text_diagram";
  ALTER TABLE "pages_blocks_lead_text" ALTER COLUMN "diagram" SET DATA TYPE "public"."enum_pages_blocks_lead_text_diagram" USING "diagram"::"public"."enum_pages_blocks_lead_text_diagram";
  ALTER TABLE "pages_blocks_form" ALTER COLUMN "form_type" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_form" ALTER COLUMN "form_type" SET DEFAULT 'enquiry'::text;
  DROP TYPE "public"."enum_pages_blocks_form_form_type";
  CREATE TYPE "public"."enum_pages_blocks_form_form_type" AS ENUM('enquiry');
  ALTER TABLE "pages_blocks_form" ALTER COLUMN "form_type" SET DEFAULT 'enquiry'::"public"."enum_pages_blocks_form_form_type";
  ALTER TABLE "pages_blocks_form" ALTER COLUMN "form_type" SET DATA TYPE "public"."enum_pages_blocks_form_form_type" USING "form_type"::"public"."enum_pages_blocks_form_form_type";
  ALTER TABLE "_pages_v_blocks_lead_text" ALTER COLUMN "highlight_mode" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_lead_text" ALTER COLUMN "highlight_mode" SET DEFAULT 'tail'::text;
  DROP TYPE "public"."enum__pages_v_blocks_lead_text_highlight_mode";
  CREATE TYPE "public"."enum__pages_v_blocks_lead_text_highlight_mode" AS ENUM('none', 'tail', 'words');
  ALTER TABLE "_pages_v_blocks_lead_text" ALTER COLUMN "highlight_mode" SET DEFAULT 'tail'::"public"."enum__pages_v_blocks_lead_text_highlight_mode";
  ALTER TABLE "_pages_v_blocks_lead_text" ALTER COLUMN "highlight_mode" SET DATA TYPE "public"."enum__pages_v_blocks_lead_text_highlight_mode" USING "highlight_mode"::"public"."enum__pages_v_blocks_lead_text_highlight_mode";
  ALTER TABLE "_pages_v_blocks_lead_text" ALTER COLUMN "diagram" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_lead_text" ALTER COLUMN "diagram" SET DEFAULT 'none'::text;
  DROP TYPE "public"."enum__pages_v_blocks_lead_text_diagram";
  CREATE TYPE "public"."enum__pages_v_blocks_lead_text_diagram" AS ENUM('none', 'merge', 'weave');
  ALTER TABLE "_pages_v_blocks_lead_text" ALTER COLUMN "diagram" SET DEFAULT 'none'::"public"."enum__pages_v_blocks_lead_text_diagram";
  ALTER TABLE "_pages_v_blocks_lead_text" ALTER COLUMN "diagram" SET DATA TYPE "public"."enum__pages_v_blocks_lead_text_diagram" USING "diagram"::"public"."enum__pages_v_blocks_lead_text_diagram";
  ALTER TABLE "_pages_v_blocks_form" ALTER COLUMN "form_type" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_form" ALTER COLUMN "form_type" SET DEFAULT 'enquiry'::text;
  DROP TYPE "public"."enum__pages_v_blocks_form_form_type";
  CREATE TYPE "public"."enum__pages_v_blocks_form_form_type" AS ENUM('enquiry');
  ALTER TABLE "_pages_v_blocks_form" ALTER COLUMN "form_type" SET DEFAULT 'enquiry'::"public"."enum__pages_v_blocks_form_form_type";
  ALTER TABLE "_pages_v_blocks_form" ALTER COLUMN "form_type" SET DATA TYPE "public"."enum__pages_v_blocks_form_form_type" USING "form_type"::"public"."enum__pages_v_blocks_form_form_type";
  DROP INDEX "pages_rels_roles_id_idx";
  DROP INDEX "_pages_v_rels_roles_id_idx";
  DROP INDEX "payload_locked_documents_rels_roles_id_idx";
  ALTER TABLE "pages_blocks_lead_text" DROP COLUMN "show_details";
  ALTER TABLE "pages_blocks_lead_text" DROP COLUMN "details_heading";
  ALTER TABLE "pages_blocks_lead_text" DROP COLUMN "details_text";
  ALTER TABLE "pages_blocks_statement" DROP COLUMN "style";
  ALTER TABLE "pages_blocks_statement" DROP COLUMN "highlight";
  ALTER TABLE "pages_blocks_form" DROP COLUMN "note";
  ALTER TABLE "pages_rels" DROP COLUMN "roles_id";
  ALTER TABLE "_pages_v_blocks_lead_text" DROP COLUMN "show_details";
  ALTER TABLE "_pages_v_blocks_lead_text" DROP COLUMN "details_heading";
  ALTER TABLE "_pages_v_blocks_lead_text" DROP COLUMN "details_text";
  ALTER TABLE "_pages_v_blocks_statement" DROP COLUMN "style";
  ALTER TABLE "_pages_v_blocks_statement" DROP COLUMN "highlight";
  ALTER TABLE "_pages_v_blocks_form" DROP COLUMN "note";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "roles_id";
  ALTER TABLE "form_submissions" DROP COLUMN "role";
  ALTER TABLE "form_submissions" DROP COLUMN "discipline";
  ALTER TABLE "form_submissions" DROP COLUMN "profile_link";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "roles_id";
  DROP TYPE "public"."enum_pages_blocks_open_roles_footer_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_open_roles_footer_link_type";
  DROP TYPE "public"."enum_pages_blocks_statement_style";
  DROP TYPE "public"."enum__pages_v_blocks_open_roles_footer_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_open_roles_footer_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_statement_style";
  DROP TYPE "public"."enum_roles_team";
  DROP TYPE "public"."enum_roles_employment_type";`)
}

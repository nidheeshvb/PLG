import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_legal_cookie_category" AS ENUM('necessary', 'analytics', 'functional', 'marketing');
  CREATE TYPE "public"."enum_pages_blocks_legal_document_ask_link_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_legal_document_ask_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum__pages_v_blocks_legal_document_ask_link_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_legal_document_ask_link_type" AS ENUM('page', 'section', 'url');
  CREATE TABLE "pages_blocks_legal_document_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_legal_document_notice_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "legal_cookies" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"provider" varchar,
  	"category" "enum_legal_cookie_category" DEFAULT 'necessary',
  	"duration" varchar,
  	"purpose" varchar
  );
  
  CREATE TABLE "pages_blocks_legal_document_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"highlight" boolean DEFAULT false,
  	"must_label" varchar,
  	"must_note" varchar DEFAULT 'Counsel to confirm scope.',
  	"body" jsonb,
  	"show_contact_card" boolean DEFAULT false,
  	"show_preferences_button" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_legal_document" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"show_brand_mark" boolean DEFAULT true,
  	"switcher_label" varchar DEFAULT 'Legal',
  	"notice_title" varchar,
  	"notice_text" varchar,
  	"intro" varchar,
  	"ask_title" varchar DEFAULT 'Questions about this policy?',
  	"ask_link_label" varchar,
  	"ask_link_appearance" "enum_pages_blocks_legal_document_ask_link_appearance" DEFAULT 'primary',
  	"ask_link_type" "enum_pages_blocks_legal_document_ask_link_type" DEFAULT 'page',
  	"ask_link_page_id" integer,
  	"ask_link_section" varchar,
  	"ask_link_url" varchar,
  	"ask_link_new_tab" boolean,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_legal_document_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_legal_document_notice_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_legal_cookies_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"provider" varchar,
  	"category" "enum_legal_cookie_category" DEFAULT 'necessary',
  	"duration" varchar,
  	"purpose" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_legal_document_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"highlight" boolean DEFAULT false,
  	"must_label" varchar,
  	"must_note" varchar DEFAULT 'Counsel to confirm scope.',
  	"body" jsonb,
  	"show_contact_card" boolean DEFAULT false,
  	"show_preferences_button" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_legal_document" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"show_brand_mark" boolean DEFAULT true,
  	"switcher_label" varchar DEFAULT 'Legal',
  	"notice_title" varchar,
  	"notice_text" varchar,
  	"intro" varchar,
  	"ask_title" varchar DEFAULT 'Questions about this policy?',
  	"ask_link_label" varchar,
  	"ask_link_appearance" "enum__pages_v_blocks_legal_document_ask_link_appearance" DEFAULT 'primary',
  	"ask_link_type" "enum__pages_v_blocks_legal_document_ask_link_type" DEFAULT 'page',
  	"ask_link_page_id" integer,
  	"ask_link_section" varchar,
  	"ask_link_url" varchar,
  	"ask_link_new_tab" boolean,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages" ADD COLUMN "forward_to_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_forward_to_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "company_name" varchar DEFAULT 'PLG Acachet';
  ALTER TABLE "site_settings" ADD COLUMN "company_email" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "company_address" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "company_phone" varchar;
  ALTER TABLE "pages_blocks_legal_document_facts" ADD CONSTRAINT "pages_blocks_legal_document_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_document"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_document_notice_points" ADD CONSTRAINT "pages_blocks_legal_document_notice_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_document"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "legal_cookies" ADD CONSTRAINT "legal_cookies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_document_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_document_sections" ADD CONSTRAINT "pages_blocks_legal_document_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_document"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_document" ADD CONSTRAINT "pages_blocks_legal_document_ask_link_page_id_pages_id_fk" FOREIGN KEY ("ask_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_document" ADD CONSTRAINT "pages_blocks_legal_document_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_document_facts" ADD CONSTRAINT "_pages_v_blocks_legal_document_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_document"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_document_notice_points" ADD CONSTRAINT "_pages_v_blocks_legal_document_notice_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_document"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_legal_cookies_v" ADD CONSTRAINT "_legal_cookies_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_document_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_document_sections" ADD CONSTRAINT "_pages_v_blocks_legal_document_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_document"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_document" ADD CONSTRAINT "_pages_v_blocks_legal_document_ask_link_page_id_pages_id_fk" FOREIGN KEY ("ask_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_document" ADD CONSTRAINT "_pages_v_blocks_legal_document_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_legal_document_facts_order_idx" ON "pages_blocks_legal_document_facts" USING btree ("_order");
  CREATE INDEX "pages_blocks_legal_document_facts_parent_id_idx" ON "pages_blocks_legal_document_facts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_legal_document_notice_points_order_idx" ON "pages_blocks_legal_document_notice_points" USING btree ("_order");
  CREATE INDEX "pages_blocks_legal_document_notice_points_parent_id_idx" ON "pages_blocks_legal_document_notice_points" USING btree ("_parent_id");
  CREATE INDEX "legal_cookies_order_idx" ON "legal_cookies" USING btree ("_order");
  CREATE INDEX "legal_cookies_parent_id_idx" ON "legal_cookies" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_legal_document_sections_order_idx" ON "pages_blocks_legal_document_sections" USING btree ("_order");
  CREATE INDEX "pages_blocks_legal_document_sections_parent_id_idx" ON "pages_blocks_legal_document_sections" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_legal_document_order_idx" ON "pages_blocks_legal_document" USING btree ("_order");
  CREATE INDEX "pages_blocks_legal_document_parent_id_idx" ON "pages_blocks_legal_document" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_legal_document_path_idx" ON "pages_blocks_legal_document" USING btree ("_path");
  CREATE INDEX "pages_blocks_legal_document_ask_link_ask_link_page_idx" ON "pages_blocks_legal_document" USING btree ("ask_link_page_id");
  CREATE INDEX "_pages_v_blocks_legal_document_facts_order_idx" ON "_pages_v_blocks_legal_document_facts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_legal_document_facts_parent_id_idx" ON "_pages_v_blocks_legal_document_facts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_legal_document_notice_points_order_idx" ON "_pages_v_blocks_legal_document_notice_points" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_legal_document_notice_points_parent_id_idx" ON "_pages_v_blocks_legal_document_notice_points" USING btree ("_parent_id");
  CREATE INDEX "_legal_cookies_v_order_idx" ON "_legal_cookies_v" USING btree ("_order");
  CREATE INDEX "_legal_cookies_v_parent_id_idx" ON "_legal_cookies_v" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_legal_document_sections_order_idx" ON "_pages_v_blocks_legal_document_sections" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_legal_document_sections_parent_id_idx" ON "_pages_v_blocks_legal_document_sections" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_legal_document_order_idx" ON "_pages_v_blocks_legal_document" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_legal_document_parent_id_idx" ON "_pages_v_blocks_legal_document" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_legal_document_path_idx" ON "_pages_v_blocks_legal_document" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_legal_document_ask_link_ask_link_page_idx" ON "_pages_v_blocks_legal_document" USING btree ("ask_link_page_id");
  ALTER TABLE "pages" ADD CONSTRAINT "pages_forward_to_id_pages_id_fk" FOREIGN KEY ("forward_to_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_forward_to_id_pages_id_fk" FOREIGN KEY ("version_forward_to_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_forward_to_idx" ON "pages" USING btree ("forward_to_id");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_version_version_forward_to_idx" ON "_pages_v" USING btree ("version_forward_to_id");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_legal_document_facts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_legal_document_notice_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "legal_cookies" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_legal_document_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_legal_document" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_legal_document_facts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_legal_document_notice_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_legal_cookies_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_legal_document_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_legal_document" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_legal_document_facts" CASCADE;
  DROP TABLE "pages_blocks_legal_document_notice_points" CASCADE;
  DROP TABLE "legal_cookies" CASCADE;
  DROP TABLE "pages_blocks_legal_document_sections" CASCADE;
  DROP TABLE "pages_blocks_legal_document" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_document_facts" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_document_notice_points" CASCADE;
  DROP TABLE "_legal_cookies_v" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_document_sections" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_document" CASCADE;
  ALTER TABLE "pages" DROP CONSTRAINT "pages_forward_to_id_pages_id_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_pages_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_forward_to_id_pages_id_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_pages_fk";
  
  DROP INDEX "pages_forward_to_idx";
  DROP INDEX "pages_rels_pages_id_idx";
  DROP INDEX "_pages_v_version_version_forward_to_idx";
  DROP INDEX "_pages_v_rels_pages_id_idx";
  ALTER TABLE "pages" DROP COLUMN "forward_to_id";
  ALTER TABLE "pages_rels" DROP COLUMN "pages_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_forward_to_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "pages_id";
  ALTER TABLE "site_settings" DROP COLUMN "company_name";
  ALTER TABLE "site_settings" DROP COLUMN "company_email";
  ALTER TABLE "site_settings" DROP COLUMN "company_address";
  ALTER TABLE "site_settings" DROP COLUMN "company_phone";
  DROP TYPE "public"."enum_legal_cookie_category";
  DROP TYPE "public"."enum_pages_blocks_legal_document_ask_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_legal_document_ask_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_legal_document_ask_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_legal_document_ask_link_type";`)
}

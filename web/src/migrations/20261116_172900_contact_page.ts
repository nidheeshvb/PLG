import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_form_aside_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum_pages_blocks_form_interest_note_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum_pages_blocks_offices_time_zone" AS ENUM('none', 'Asia/Dubai', 'Asia/Riyadh', 'Europe/London');
  CREATE TYPE "public"."enum__pages_v_blocks_form_aside_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum__pages_v_blocks_form_interest_note_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum__pages_v_blocks_offices_time_zone" AS ENUM('none', 'Asia/Dubai', 'Asia/Riyadh', 'Europe/London');
  ALTER TYPE "public"."enum_pages_blocks_form_form_type" ADD VALUE 'contact';
  ALTER TYPE "public"."enum__pages_v_blocks_form_form_type" ADD VALUE 'contact';
  CREATE TABLE "pages_blocks_form_promises" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_form_interests" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"shows_note" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_offices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"gradient_title" boolean DEFAULT true,
  	"lede" varchar,
  	"image_id" integer,
  	"tag" varchar DEFAULT 'Head office',
  	"city" varchar,
  	"time_zone" "enum_pages_blocks_offices_time_zone" DEFAULT 'Asia/Dubai',
  	"email" varchar,
  	"phone" varchar,
  	"address" varchar,
  	"directions_query" varchar,
  	"hours" varchar,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_form_promises" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_form_interests" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"shows_note" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_offices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"gradient_title" boolean DEFAULT true,
  	"lede" varchar,
  	"image_id" integer,
  	"tag" varchar DEFAULT 'Head office',
  	"city" varchar,
  	"time_zone" "enum__pages_v_blocks_offices_time_zone" DEFAULT 'Asia/Dubai',
  	"email" varchar,
  	"phone" varchar,
  	"address" varchar,
  	"directions_query" varchar,
  	"hours" varchar,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_form" ADD COLUMN "aside_text" varchar;
  ALTER TABLE "pages_blocks_form" ADD COLUMN "aside_link_label" varchar;
  ALTER TABLE "pages_blocks_form" ADD COLUMN "aside_link_type" "enum_pages_blocks_form_aside_link_type" DEFAULT 'page';
  ALTER TABLE "pages_blocks_form" ADD COLUMN "aside_link_page_id" integer;
  ALTER TABLE "pages_blocks_form" ADD COLUMN "aside_link_section" varchar;
  ALTER TABLE "pages_blocks_form" ADD COLUMN "aside_link_url" varchar;
  ALTER TABLE "pages_blocks_form" ADD COLUMN "aside_link_new_tab" boolean;
  ALTER TABLE "pages_blocks_form" ADD COLUMN "interests_label" varchar DEFAULT 'What are you looking to unlock?';
  ALTER TABLE "pages_blocks_form" ADD COLUMN "interests_hint" varchar DEFAULT 'Choose any that apply';
  ALTER TABLE "pages_blocks_form" ADD COLUMN "interest_note" varchar;
  ALTER TABLE "pages_blocks_form" ADD COLUMN "interest_note_link_label" varchar;
  ALTER TABLE "pages_blocks_form" ADD COLUMN "interest_note_link_type" "enum_pages_blocks_form_interest_note_link_type" DEFAULT 'page';
  ALTER TABLE "pages_blocks_form" ADD COLUMN "interest_note_link_page_id" integer;
  ALTER TABLE "pages_blocks_form" ADD COLUMN "interest_note_link_section" varchar;
  ALTER TABLE "pages_blocks_form" ADD COLUMN "interest_note_link_url" varchar;
  ALTER TABLE "pages_blocks_form" ADD COLUMN "interest_note_link_new_tab" boolean;
  ALTER TABLE "pages_blocks_form" ADD COLUMN "message_label" varchar DEFAULT 'Tell us about the ambition';
  ALTER TABLE "pages_blocks_form" ADD COLUMN "message_placeholder" varchar;
  ALTER TABLE "pages_blocks_form" ADD COLUMN "consent_text" varchar DEFAULT 'I agree to PLG Acachet using my details to respond to this enquiry.';
  ALTER TABLE "pages_blocks_form" ADD COLUMN "success_title" varchar DEFAULT 'Thank you. We’ll be in touch within two business days.';
  ALTER TABLE "_pages_v_blocks_form" ADD COLUMN "aside_text" varchar;
  ALTER TABLE "_pages_v_blocks_form" ADD COLUMN "aside_link_label" varchar;
  ALTER TABLE "_pages_v_blocks_form" ADD COLUMN "aside_link_type" "enum__pages_v_blocks_form_aside_link_type" DEFAULT 'page';
  ALTER TABLE "_pages_v_blocks_form" ADD COLUMN "aside_link_page_id" integer;
  ALTER TABLE "_pages_v_blocks_form" ADD COLUMN "aside_link_section" varchar;
  ALTER TABLE "_pages_v_blocks_form" ADD COLUMN "aside_link_url" varchar;
  ALTER TABLE "_pages_v_blocks_form" ADD COLUMN "aside_link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_form" ADD COLUMN "interests_label" varchar DEFAULT 'What are you looking to unlock?';
  ALTER TABLE "_pages_v_blocks_form" ADD COLUMN "interests_hint" varchar DEFAULT 'Choose any that apply';
  ALTER TABLE "_pages_v_blocks_form" ADD COLUMN "interest_note" varchar;
  ALTER TABLE "_pages_v_blocks_form" ADD COLUMN "interest_note_link_label" varchar;
  ALTER TABLE "_pages_v_blocks_form" ADD COLUMN "interest_note_link_type" "enum__pages_v_blocks_form_interest_note_link_type" DEFAULT 'page';
  ALTER TABLE "_pages_v_blocks_form" ADD COLUMN "interest_note_link_page_id" integer;
  ALTER TABLE "_pages_v_blocks_form" ADD COLUMN "interest_note_link_section" varchar;
  ALTER TABLE "_pages_v_blocks_form" ADD COLUMN "interest_note_link_url" varchar;
  ALTER TABLE "_pages_v_blocks_form" ADD COLUMN "interest_note_link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_form" ADD COLUMN "message_label" varchar DEFAULT 'Tell us about the ambition';
  ALTER TABLE "_pages_v_blocks_form" ADD COLUMN "message_placeholder" varchar;
  ALTER TABLE "_pages_v_blocks_form" ADD COLUMN "consent_text" varchar DEFAULT 'I agree to PLG Acachet using my details to respond to this enquiry.';
  ALTER TABLE "_pages_v_blocks_form" ADD COLUMN "success_title" varchar DEFAULT 'Thank you. We’ll be in touch within two business days.';
  ALTER TABLE "form_submissions" ADD COLUMN "company" varchar;
  ALTER TABLE "form_submissions" ADD COLUMN "consent" boolean;
  ALTER TABLE "form_submissions" ADD COLUMN "interests" varchar;
  ALTER TABLE "pages_blocks_form_promises" ADD CONSTRAINT "pages_blocks_form_promises_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_interests" ADD CONSTRAINT "pages_blocks_form_interests_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_offices" ADD CONSTRAINT "pages_blocks_offices_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_offices" ADD CONSTRAINT "pages_blocks_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_promises" ADD CONSTRAINT "_pages_v_blocks_form_promises_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_interests" ADD CONSTRAINT "_pages_v_blocks_form_interests_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_offices" ADD CONSTRAINT "_pages_v_blocks_offices_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_offices" ADD CONSTRAINT "_pages_v_blocks_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_form_promises_order_idx" ON "pages_blocks_form_promises" USING btree ("_order");
  CREATE INDEX "pages_blocks_form_promises_parent_id_idx" ON "pages_blocks_form_promises" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_form_interests_order_idx" ON "pages_blocks_form_interests" USING btree ("_order");
  CREATE INDEX "pages_blocks_form_interests_parent_id_idx" ON "pages_blocks_form_interests" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_offices_order_idx" ON "pages_blocks_offices" USING btree ("_order");
  CREATE INDEX "pages_blocks_offices_parent_id_idx" ON "pages_blocks_offices" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_offices_path_idx" ON "pages_blocks_offices" USING btree ("_path");
  CREATE INDEX "pages_blocks_offices_image_idx" ON "pages_blocks_offices" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_form_promises_order_idx" ON "_pages_v_blocks_form_promises" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_form_promises_parent_id_idx" ON "_pages_v_blocks_form_promises" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_form_interests_order_idx" ON "_pages_v_blocks_form_interests" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_form_interests_parent_id_idx" ON "_pages_v_blocks_form_interests" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_offices_order_idx" ON "_pages_v_blocks_offices" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_offices_parent_id_idx" ON "_pages_v_blocks_offices" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_offices_path_idx" ON "_pages_v_blocks_offices" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_offices_image_idx" ON "_pages_v_blocks_offices" USING btree ("image_id");
  ALTER TABLE "pages_blocks_form" ADD CONSTRAINT "pages_blocks_form_aside_link_page_id_pages_id_fk" FOREIGN KEY ("aside_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_form" ADD CONSTRAINT "pages_blocks_form_interest_note_link_page_id_pages_id_fk" FOREIGN KEY ("interest_note_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form" ADD CONSTRAINT "_pages_v_blocks_form_aside_link_page_id_pages_id_fk" FOREIGN KEY ("aside_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form" ADD CONSTRAINT "_pages_v_blocks_form_interest_note_link_page_id_pages_id_fk" FOREIGN KEY ("interest_note_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_form_aside_link_aside_link_page_idx" ON "pages_blocks_form" USING btree ("aside_link_page_id");
  CREATE INDEX "pages_blocks_form_interest_note_link_interest_note_link__idx" ON "pages_blocks_form" USING btree ("interest_note_link_page_id");
  CREATE INDEX "_pages_v_blocks_form_aside_link_aside_link_page_idx" ON "_pages_v_blocks_form" USING btree ("aside_link_page_id");
  CREATE INDEX "_pages_v_blocks_form_interest_note_link_interest_note_li_idx" ON "_pages_v_blocks_form" USING btree ("interest_note_link_page_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_form_promises" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_form_interests" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_offices" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_form_promises" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_form_interests" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_offices" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_form_promises" CASCADE;
  DROP TABLE "pages_blocks_form_interests" CASCADE;
  DROP TABLE "pages_blocks_offices" CASCADE;
  DROP TABLE "_pages_v_blocks_form_promises" CASCADE;
  DROP TABLE "_pages_v_blocks_form_interests" CASCADE;
  DROP TABLE "_pages_v_blocks_offices" CASCADE;
  ALTER TABLE "pages_blocks_form" DROP CONSTRAINT "pages_blocks_form_aside_link_page_id_pages_id_fk";
  
  ALTER TABLE "pages_blocks_form" DROP CONSTRAINT "pages_blocks_form_interest_note_link_page_id_pages_id_fk";
  
  ALTER TABLE "_pages_v_blocks_form" DROP CONSTRAINT "_pages_v_blocks_form_aside_link_page_id_pages_id_fk";
  
  ALTER TABLE "_pages_v_blocks_form" DROP CONSTRAINT "_pages_v_blocks_form_interest_note_link_page_id_pages_id_fk";
  
  ALTER TABLE "pages_blocks_form" ALTER COLUMN "form_type" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_form" ALTER COLUMN "form_type" SET DEFAULT 'enquiry'::text;
  DROP TYPE "public"."enum_pages_blocks_form_form_type";
  CREATE TYPE "public"."enum_pages_blocks_form_form_type" AS ENUM('enquiry', 'application');
  ALTER TABLE "pages_blocks_form" ALTER COLUMN "form_type" SET DEFAULT 'enquiry'::"public"."enum_pages_blocks_form_form_type";
  ALTER TABLE "pages_blocks_form" ALTER COLUMN "form_type" SET DATA TYPE "public"."enum_pages_blocks_form_form_type" USING "form_type"::"public"."enum_pages_blocks_form_form_type";
  ALTER TABLE "_pages_v_blocks_form" ALTER COLUMN "form_type" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_form" ALTER COLUMN "form_type" SET DEFAULT 'enquiry'::text;
  DROP TYPE "public"."enum__pages_v_blocks_form_form_type";
  CREATE TYPE "public"."enum__pages_v_blocks_form_form_type" AS ENUM('enquiry', 'application');
  ALTER TABLE "_pages_v_blocks_form" ALTER COLUMN "form_type" SET DEFAULT 'enquiry'::"public"."enum__pages_v_blocks_form_form_type";
  ALTER TABLE "_pages_v_blocks_form" ALTER COLUMN "form_type" SET DATA TYPE "public"."enum__pages_v_blocks_form_form_type" USING "form_type"::"public"."enum__pages_v_blocks_form_form_type";
  DROP INDEX "pages_blocks_form_aside_link_aside_link_page_idx";
  DROP INDEX "pages_blocks_form_interest_note_link_interest_note_link__idx";
  DROP INDEX "_pages_v_blocks_form_aside_link_aside_link_page_idx";
  DROP INDEX "_pages_v_blocks_form_interest_note_link_interest_note_li_idx";
  ALTER TABLE "pages_blocks_form" DROP COLUMN "aside_text";
  ALTER TABLE "pages_blocks_form" DROP COLUMN "aside_link_label";
  ALTER TABLE "pages_blocks_form" DROP COLUMN "aside_link_type";
  ALTER TABLE "pages_blocks_form" DROP COLUMN "aside_link_page_id";
  ALTER TABLE "pages_blocks_form" DROP COLUMN "aside_link_section";
  ALTER TABLE "pages_blocks_form" DROP COLUMN "aside_link_url";
  ALTER TABLE "pages_blocks_form" DROP COLUMN "aside_link_new_tab";
  ALTER TABLE "pages_blocks_form" DROP COLUMN "interests_label";
  ALTER TABLE "pages_blocks_form" DROP COLUMN "interests_hint";
  ALTER TABLE "pages_blocks_form" DROP COLUMN "interest_note";
  ALTER TABLE "pages_blocks_form" DROP COLUMN "interest_note_link_label";
  ALTER TABLE "pages_blocks_form" DROP COLUMN "interest_note_link_type";
  ALTER TABLE "pages_blocks_form" DROP COLUMN "interest_note_link_page_id";
  ALTER TABLE "pages_blocks_form" DROP COLUMN "interest_note_link_section";
  ALTER TABLE "pages_blocks_form" DROP COLUMN "interest_note_link_url";
  ALTER TABLE "pages_blocks_form" DROP COLUMN "interest_note_link_new_tab";
  ALTER TABLE "pages_blocks_form" DROP COLUMN "message_label";
  ALTER TABLE "pages_blocks_form" DROP COLUMN "message_placeholder";
  ALTER TABLE "pages_blocks_form" DROP COLUMN "consent_text";
  ALTER TABLE "pages_blocks_form" DROP COLUMN "success_title";
  ALTER TABLE "_pages_v_blocks_form" DROP COLUMN "aside_text";
  ALTER TABLE "_pages_v_blocks_form" DROP COLUMN "aside_link_label";
  ALTER TABLE "_pages_v_blocks_form" DROP COLUMN "aside_link_type";
  ALTER TABLE "_pages_v_blocks_form" DROP COLUMN "aside_link_page_id";
  ALTER TABLE "_pages_v_blocks_form" DROP COLUMN "aside_link_section";
  ALTER TABLE "_pages_v_blocks_form" DROP COLUMN "aside_link_url";
  ALTER TABLE "_pages_v_blocks_form" DROP COLUMN "aside_link_new_tab";
  ALTER TABLE "_pages_v_blocks_form" DROP COLUMN "interests_label";
  ALTER TABLE "_pages_v_blocks_form" DROP COLUMN "interests_hint";
  ALTER TABLE "_pages_v_blocks_form" DROP COLUMN "interest_note";
  ALTER TABLE "_pages_v_blocks_form" DROP COLUMN "interest_note_link_label";
  ALTER TABLE "_pages_v_blocks_form" DROP COLUMN "interest_note_link_type";
  ALTER TABLE "_pages_v_blocks_form" DROP COLUMN "interest_note_link_page_id";
  ALTER TABLE "_pages_v_blocks_form" DROP COLUMN "interest_note_link_section";
  ALTER TABLE "_pages_v_blocks_form" DROP COLUMN "interest_note_link_url";
  ALTER TABLE "_pages_v_blocks_form" DROP COLUMN "interest_note_link_new_tab";
  ALTER TABLE "_pages_v_blocks_form" DROP COLUMN "message_label";
  ALTER TABLE "_pages_v_blocks_form" DROP COLUMN "message_placeholder";
  ALTER TABLE "_pages_v_blocks_form" DROP COLUMN "consent_text";
  ALTER TABLE "_pages_v_blocks_form" DROP COLUMN "success_title";
  ALTER TABLE "form_submissions" DROP COLUMN "company";
  ALTER TABLE "form_submissions" DROP COLUMN "consent";
  ALTER TABLE "form_submissions" DROP COLUMN "interests";
  DROP TYPE "public"."enum_pages_blocks_form_aside_link_type";
  DROP TYPE "public"."enum_pages_blocks_form_interest_note_link_type";
  DROP TYPE "public"."enum_pages_blocks_offices_time_zone";
  DROP TYPE "public"."enum__pages_v_blocks_form_aside_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_form_interest_note_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_offices_time_zone";`)
}

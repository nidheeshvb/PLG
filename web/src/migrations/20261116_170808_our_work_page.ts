import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_case_study_grid_cta_link_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_case_study_grid_cta_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum__pages_v_blocks_case_study_grid_cta_link_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_case_study_grid_cta_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum_case_studies_services" AS ENUM('strategy', 'events', 'media', 'creative');
  CREATE TABLE "pages_blocks_case_study_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_filter" boolean DEFAULT true,
  	"filter_label" varchar DEFAULT 'Filter',
  	"all_label" varchar DEFAULT 'All work',
  	"explore_label" varchar DEFAULT 'Explore Project',
  	"empty_text" varchar DEFAULT 'No case studies under this service yet.',
  	"next_label" varchar DEFAULT 'Next case study',
  	"cta_link_label" varchar,
  	"cta_link_appearance" "enum_pages_blocks_case_study_grid_cta_link_appearance" DEFAULT 'primary',
  	"cta_link_type" "enum_pages_blocks_case_study_grid_cta_link_type" DEFAULT 'page',
  	"cta_link_page_id" integer,
  	"cta_link_section" varchar,
  	"cta_link_url" varchar,
  	"cta_link_new_tab" boolean,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_case_study_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_filter" boolean DEFAULT true,
  	"filter_label" varchar DEFAULT 'Filter',
  	"all_label" varchar DEFAULT 'All work',
  	"explore_label" varchar DEFAULT 'Explore Project',
  	"empty_text" varchar DEFAULT 'No case studies under this service yet.',
  	"next_label" varchar DEFAULT 'Next case study',
  	"cta_link_label" varchar,
  	"cta_link_appearance" "enum__pages_v_blocks_case_study_grid_cta_link_appearance" DEFAULT 'primary',
  	"cta_link_type" "enum__pages_v_blocks_case_study_grid_cta_link_type" DEFAULT 'page',
  	"cta_link_page_id" integer,
  	"cta_link_section" varchar,
  	"cta_link_url" varchar,
  	"cta_link_new_tab" boolean,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_services" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_case_studies_services",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "case_studies_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "case_studies_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "case_studies_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_case_study_gallery_items" ADD COLUMN "image_id" integer;
  ALTER TABLE "_pages_v_blocks_case_study_gallery_items" ADD COLUMN "image_id" integer;
  ALTER TABLE "case_studies" ADD COLUMN "wide" boolean DEFAULT false;
  ALTER TABLE "case_studies" ADD COLUMN "key_visual_pending" boolean DEFAULT false;
  ALTER TABLE "case_studies" ADD COLUMN "market" varchar;
  ALTER TABLE "case_studies" ADD COLUMN "year" varchar;
  ALTER TABLE "case_studies" ADD COLUMN "brief" varchar;
  ALTER TABLE "case_studies" ADD COLUMN "approach" varchar;
  ALTER TABLE "case_studies" ADD COLUMN "still_id" integer;
  ALTER TABLE "case_studies" ADD COLUMN "still_caption" varchar DEFAULT 'On the ground';
  ALTER TABLE "case_studies" ADD COLUMN "film_id" integer;
  ALTER TABLE "case_studies" ADD COLUMN "film_caption" varchar DEFAULT 'Programme film';
  ALTER TABLE "case_studies" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "case_studies" ADD COLUMN "sort_order" numeric DEFAULT 0;
  ALTER TABLE "pages_blocks_case_study_grid" ADD CONSTRAINT "pages_blocks_case_study_grid_cta_link_page_id_pages_id_fk" FOREIGN KEY ("cta_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_case_study_grid" ADD CONSTRAINT "pages_blocks_case_study_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_case_study_grid" ADD CONSTRAINT "_pages_v_blocks_case_study_grid_cta_link_page_id_pages_id_fk" FOREIGN KEY ("cta_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_case_study_grid" ADD CONSTRAINT "_pages_v_blocks_case_study_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_services" ADD CONSTRAINT "case_studies_services_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_results" ADD CONSTRAINT "case_studies_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_points" ADD CONSTRAINT "case_studies_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_gallery" ADD CONSTRAINT "case_studies_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies_gallery" ADD CONSTRAINT "case_studies_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_case_study_grid_order_idx" ON "pages_blocks_case_study_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_case_study_grid_parent_id_idx" ON "pages_blocks_case_study_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_case_study_grid_path_idx" ON "pages_blocks_case_study_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_case_study_grid_cta_link_cta_link_page_idx" ON "pages_blocks_case_study_grid" USING btree ("cta_link_page_id");
  CREATE INDEX "_pages_v_blocks_case_study_grid_order_idx" ON "_pages_v_blocks_case_study_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_case_study_grid_parent_id_idx" ON "_pages_v_blocks_case_study_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_case_study_grid_path_idx" ON "_pages_v_blocks_case_study_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_case_study_grid_cta_link_cta_link_page_idx" ON "_pages_v_blocks_case_study_grid" USING btree ("cta_link_page_id");
  CREATE INDEX "case_studies_services_order_idx" ON "case_studies_services" USING btree ("order");
  CREATE INDEX "case_studies_services_parent_idx" ON "case_studies_services" USING btree ("parent_id");
  CREATE INDEX "case_studies_results_order_idx" ON "case_studies_results" USING btree ("_order");
  CREATE INDEX "case_studies_results_parent_id_idx" ON "case_studies_results" USING btree ("_parent_id");
  CREATE INDEX "case_studies_points_order_idx" ON "case_studies_points" USING btree ("_order");
  CREATE INDEX "case_studies_points_parent_id_idx" ON "case_studies_points" USING btree ("_parent_id");
  CREATE INDEX "case_studies_gallery_order_idx" ON "case_studies_gallery" USING btree ("_order");
  CREATE INDEX "case_studies_gallery_parent_id_idx" ON "case_studies_gallery" USING btree ("_parent_id");
  CREATE INDEX "case_studies_gallery_image_idx" ON "case_studies_gallery" USING btree ("image_id");
  ALTER TABLE "pages_blocks_case_study_gallery_items" ADD CONSTRAINT "pages_blocks_case_study_gallery_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_case_study_gallery_items" ADD CONSTRAINT "_pages_v_blocks_case_study_gallery_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_still_id_media_id_fk" FOREIGN KEY ("still_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_film_id_media_id_fk" FOREIGN KEY ("film_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_case_study_gallery_items_image_idx" ON "pages_blocks_case_study_gallery_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_case_study_gallery_items_image_idx" ON "_pages_v_blocks_case_study_gallery_items" USING btree ("image_id");
  CREATE INDEX "case_studies_still_idx" ON "case_studies" USING btree ("still_id");
  CREATE INDEX "case_studies_film_idx" ON "case_studies" USING btree ("film_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_case_study_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_case_study_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_studies_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_studies_results" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_studies_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_studies_gallery" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_case_study_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_case_study_grid" CASCADE;
  DROP TABLE "case_studies_services" CASCADE;
  DROP TABLE "case_studies_results" CASCADE;
  DROP TABLE "case_studies_points" CASCADE;
  DROP TABLE "case_studies_gallery" CASCADE;
  ALTER TABLE "pages_blocks_case_study_gallery_items" DROP CONSTRAINT "pages_blocks_case_study_gallery_items_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_case_study_gallery_items" DROP CONSTRAINT "_pages_v_blocks_case_study_gallery_items_image_id_media_id_fk";
  
  ALTER TABLE "case_studies" DROP CONSTRAINT "case_studies_still_id_media_id_fk";
  
  ALTER TABLE "case_studies" DROP CONSTRAINT "case_studies_film_id_media_id_fk";
  
  DROP INDEX "pages_blocks_case_study_gallery_items_image_idx";
  DROP INDEX "_pages_v_blocks_case_study_gallery_items_image_idx";
  DROP INDEX "case_studies_still_idx";
  DROP INDEX "case_studies_film_idx";
  ALTER TABLE "pages_blocks_case_study_gallery_items" DROP COLUMN "image_id";
  ALTER TABLE "_pages_v_blocks_case_study_gallery_items" DROP COLUMN "image_id";
  ALTER TABLE "case_studies" DROP COLUMN "wide";
  ALTER TABLE "case_studies" DROP COLUMN "key_visual_pending";
  ALTER TABLE "case_studies" DROP COLUMN "market";
  ALTER TABLE "case_studies" DROP COLUMN "year";
  ALTER TABLE "case_studies" DROP COLUMN "brief";
  ALTER TABLE "case_studies" DROP COLUMN "approach";
  ALTER TABLE "case_studies" DROP COLUMN "still_id";
  ALTER TABLE "case_studies" DROP COLUMN "still_caption";
  ALTER TABLE "case_studies" DROP COLUMN "film_id";
  ALTER TABLE "case_studies" DROP COLUMN "film_caption";
  ALTER TABLE "case_studies" DROP COLUMN "meta_description";
  ALTER TABLE "case_studies" DROP COLUMN "sort_order";
  DROP TYPE "public"."enum_pages_blocks_case_study_grid_cta_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_case_study_grid_cta_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_case_study_grid_cta_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_case_study_grid_cta_link_type";
  DROP TYPE "public"."enum_case_studies_services";`)
}

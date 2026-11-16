import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_section_nav_bar_style" AS ENUM('bar', 'sticky');
  CREATE TYPE "public"."enum_pages_blocks_service_detail_links_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_service_detail_links_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum_pages_blocks_svc_list_items_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum__pages_v_blocks_section_nav_bar_style" AS ENUM('bar', 'sticky');
  CREATE TYPE "public"."enum__pages_v_blocks_service_detail_links_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_service_detail_links_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum__pages_v_blocks_svc_list_items_link_type" AS ENUM('page', 'section', 'url');
  ALTER TYPE "public"."enum_pages_blocks_lead_text_text_size" ADD VALUE 'sm';
  ALTER TYPE "public"."enum_pages_blocks_link_tiles_tile_style" ADD VALUE 'numbered';
  ALTER TYPE "public"."enum__pages_v_blocks_lead_text_text_size" ADD VALUE 'sm';
  ALTER TYPE "public"."enum__pages_v_blocks_link_tiles_tile_style" ADD VALUE 'numbered';
  CREATE TABLE "pages_blocks_lead_text_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_service_detail_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"appearance" "enum_pages_blocks_service_detail_links_appearance" DEFAULT 'primary',
  	"type" "enum_pages_blocks_service_detail_links_type" DEFAULT 'page',
  	"page_id" integer,
  	"section" varchar,
  	"url" varchar,
  	"new_tab" boolean
  );
  
  CREATE TABLE "pages_blocks_svc_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_svc_highlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"name" varchar,
  	"note" varchar,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_svc_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"tag" varchar,
  	"text" varchar,
  	"show_link" boolean DEFAULT false,
  	"link_label" varchar,
  	"link_type" "enum_pages_blocks_svc_list_items_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_section" varchar,
  	"link_url" varchar,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "pages_blocks_svc_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_svc_collage_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_svc_collage" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_service_detail" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hook" varchar,
  	"lead" varchar,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lead_text_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_detail_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"appearance" "enum__pages_v_blocks_service_detail_links_appearance" DEFAULT 'primary',
  	"type" "enum__pages_v_blocks_service_detail_links_type" DEFAULT 'page',
  	"page_id" integer,
  	"section" varchar,
  	"url" varchar,
  	"new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_svc_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_svc_highlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"name" varchar,
  	"note" varchar,
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_svc_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"tag" varchar,
  	"text" varchar,
  	"show_link" boolean DEFAULT false,
  	"link_label" varchar,
  	"link_type" "enum__pages_v_blocks_svc_list_items_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_section" varchar,
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_svc_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_svc_collage_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_svc_collage" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_detail" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hook" varchar,
  	"lead" varchar,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "smaller_on_phones" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_section_nav" ADD COLUMN "bar_style" "enum_pages_blocks_section_nav_bar_style" DEFAULT 'bar';
  ALTER TABLE "pages_blocks_lead_text" ADD COLUMN "heading" varchar;
  ALTER TABLE "pages_blocks_lead_text" ADD COLUMN "band" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_link_tiles" ADD COLUMN "gradient_title" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "smaller_on_phones" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_section_nav" ADD COLUMN "bar_style" "enum__pages_v_blocks_section_nav_bar_style" DEFAULT 'bar';
  ALTER TABLE "_pages_v_blocks_lead_text" ADD COLUMN "heading" varchar;
  ALTER TABLE "_pages_v_blocks_lead_text" ADD COLUMN "band" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_link_tiles" ADD COLUMN "gradient_title" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_lead_text_notes" ADD CONSTRAINT "pages_blocks_lead_text_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lead_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_detail_links" ADD CONSTRAINT "pages_blocks_service_detail_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_detail_links" ADD CONSTRAINT "pages_blocks_service_detail_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_detail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_svc_image" ADD CONSTRAINT "pages_blocks_svc_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_svc_image" ADD CONSTRAINT "pages_blocks_svc_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_svc_highlight" ADD CONSTRAINT "pages_blocks_svc_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_svc_list_items" ADD CONSTRAINT "pages_blocks_svc_list_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_svc_list_items" ADD CONSTRAINT "pages_blocks_svc_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_svc_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_svc_list" ADD CONSTRAINT "pages_blocks_svc_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_svc_collage_images" ADD CONSTRAINT "pages_blocks_svc_collage_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_svc_collage_images" ADD CONSTRAINT "pages_blocks_svc_collage_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_svc_collage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_svc_collage" ADD CONSTRAINT "pages_blocks_svc_collage_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_detail" ADD CONSTRAINT "pages_blocks_service_detail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lead_text_notes" ADD CONSTRAINT "_pages_v_blocks_lead_text_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lead_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_detail_links" ADD CONSTRAINT "_pages_v_blocks_service_detail_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_detail_links" ADD CONSTRAINT "_pages_v_blocks_service_detail_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_service_detail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_svc_image" ADD CONSTRAINT "_pages_v_blocks_svc_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_svc_image" ADD CONSTRAINT "_pages_v_blocks_svc_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_svc_highlight" ADD CONSTRAINT "_pages_v_blocks_svc_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_svc_list_items" ADD CONSTRAINT "_pages_v_blocks_svc_list_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_svc_list_items" ADD CONSTRAINT "_pages_v_blocks_svc_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_svc_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_svc_list" ADD CONSTRAINT "_pages_v_blocks_svc_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_svc_collage_images" ADD CONSTRAINT "_pages_v_blocks_svc_collage_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_svc_collage_images" ADD CONSTRAINT "_pages_v_blocks_svc_collage_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_svc_collage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_svc_collage" ADD CONSTRAINT "_pages_v_blocks_svc_collage_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_detail" ADD CONSTRAINT "_pages_v_blocks_service_detail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_lead_text_notes_order_idx" ON "pages_blocks_lead_text_notes" USING btree ("_order");
  CREATE INDEX "pages_blocks_lead_text_notes_parent_id_idx" ON "pages_blocks_lead_text_notes" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_detail_links_order_idx" ON "pages_blocks_service_detail_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_detail_links_parent_id_idx" ON "pages_blocks_service_detail_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_detail_links_page_idx" ON "pages_blocks_service_detail_links" USING btree ("page_id");
  CREATE INDEX "pages_blocks_svc_image_order_idx" ON "pages_blocks_svc_image" USING btree ("_order");
  CREATE INDEX "pages_blocks_svc_image_parent_id_idx" ON "pages_blocks_svc_image" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_svc_image_path_idx" ON "pages_blocks_svc_image" USING btree ("_path");
  CREATE INDEX "pages_blocks_svc_image_image_idx" ON "pages_blocks_svc_image" USING btree ("image_id");
  CREATE INDEX "pages_blocks_svc_highlight_order_idx" ON "pages_blocks_svc_highlight" USING btree ("_order");
  CREATE INDEX "pages_blocks_svc_highlight_parent_id_idx" ON "pages_blocks_svc_highlight" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_svc_highlight_path_idx" ON "pages_blocks_svc_highlight" USING btree ("_path");
  CREATE INDEX "pages_blocks_svc_list_items_order_idx" ON "pages_blocks_svc_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_svc_list_items_parent_id_idx" ON "pages_blocks_svc_list_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_svc_list_items_link_link_page_idx" ON "pages_blocks_svc_list_items" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_svc_list_order_idx" ON "pages_blocks_svc_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_svc_list_parent_id_idx" ON "pages_blocks_svc_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_svc_list_path_idx" ON "pages_blocks_svc_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_svc_collage_images_order_idx" ON "pages_blocks_svc_collage_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_svc_collage_images_parent_id_idx" ON "pages_blocks_svc_collage_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_svc_collage_images_image_idx" ON "pages_blocks_svc_collage_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_svc_collage_order_idx" ON "pages_blocks_svc_collage" USING btree ("_order");
  CREATE INDEX "pages_blocks_svc_collage_parent_id_idx" ON "pages_blocks_svc_collage" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_svc_collage_path_idx" ON "pages_blocks_svc_collage" USING btree ("_path");
  CREATE INDEX "pages_blocks_service_detail_order_idx" ON "pages_blocks_service_detail" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_detail_parent_id_idx" ON "pages_blocks_service_detail" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_detail_path_idx" ON "pages_blocks_service_detail" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_lead_text_notes_order_idx" ON "_pages_v_blocks_lead_text_notes" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lead_text_notes_parent_id_idx" ON "_pages_v_blocks_lead_text_notes" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_detail_links_order_idx" ON "_pages_v_blocks_service_detail_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_detail_links_parent_id_idx" ON "_pages_v_blocks_service_detail_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_detail_links_page_idx" ON "_pages_v_blocks_service_detail_links" USING btree ("page_id");
  CREATE INDEX "_pages_v_blocks_svc_image_order_idx" ON "_pages_v_blocks_svc_image" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_svc_image_parent_id_idx" ON "_pages_v_blocks_svc_image" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_svc_image_path_idx" ON "_pages_v_blocks_svc_image" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_svc_image_image_idx" ON "_pages_v_blocks_svc_image" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_svc_highlight_order_idx" ON "_pages_v_blocks_svc_highlight" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_svc_highlight_parent_id_idx" ON "_pages_v_blocks_svc_highlight" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_svc_highlight_path_idx" ON "_pages_v_blocks_svc_highlight" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_svc_list_items_order_idx" ON "_pages_v_blocks_svc_list_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_svc_list_items_parent_id_idx" ON "_pages_v_blocks_svc_list_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_svc_list_items_link_link_page_idx" ON "_pages_v_blocks_svc_list_items" USING btree ("link_page_id");
  CREATE INDEX "_pages_v_blocks_svc_list_order_idx" ON "_pages_v_blocks_svc_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_svc_list_parent_id_idx" ON "_pages_v_blocks_svc_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_svc_list_path_idx" ON "_pages_v_blocks_svc_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_svc_collage_images_order_idx" ON "_pages_v_blocks_svc_collage_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_svc_collage_images_parent_id_idx" ON "_pages_v_blocks_svc_collage_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_svc_collage_images_image_idx" ON "_pages_v_blocks_svc_collage_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_svc_collage_order_idx" ON "_pages_v_blocks_svc_collage" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_svc_collage_parent_id_idx" ON "_pages_v_blocks_svc_collage" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_svc_collage_path_idx" ON "_pages_v_blocks_svc_collage" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_service_detail_order_idx" ON "_pages_v_blocks_service_detail" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_detail_parent_id_idx" ON "_pages_v_blocks_service_detail" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_detail_path_idx" ON "_pages_v_blocks_service_detail" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_lead_text_notes" CASCADE;
  DROP TABLE "pages_blocks_service_detail_links" CASCADE;
  DROP TABLE "pages_blocks_svc_image" CASCADE;
  DROP TABLE "pages_blocks_svc_highlight" CASCADE;
  DROP TABLE "pages_blocks_svc_list_items" CASCADE;
  DROP TABLE "pages_blocks_svc_list" CASCADE;
  DROP TABLE "pages_blocks_svc_collage_images" CASCADE;
  DROP TABLE "pages_blocks_svc_collage" CASCADE;
  DROP TABLE "pages_blocks_service_detail" CASCADE;
  DROP TABLE "_pages_v_blocks_lead_text_notes" CASCADE;
  DROP TABLE "_pages_v_blocks_service_detail_links" CASCADE;
  DROP TABLE "_pages_v_blocks_svc_image" CASCADE;
  DROP TABLE "_pages_v_blocks_svc_highlight" CASCADE;
  DROP TABLE "_pages_v_blocks_svc_list_items" CASCADE;
  DROP TABLE "_pages_v_blocks_svc_list" CASCADE;
  DROP TABLE "_pages_v_blocks_svc_collage_images" CASCADE;
  DROP TABLE "_pages_v_blocks_svc_collage" CASCADE;
  DROP TABLE "_pages_v_blocks_service_detail" CASCADE;
  ALTER TABLE "pages_blocks_lead_text" ALTER COLUMN "text_size" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_lead_text" ALTER COLUMN "text_size" SET DEFAULT 'lg'::text;
  DROP TYPE "public"."enum_pages_blocks_lead_text_text_size";
  CREATE TYPE "public"."enum_pages_blocks_lead_text_text_size" AS ENUM('lg', 'md');
  ALTER TABLE "pages_blocks_lead_text" ALTER COLUMN "text_size" SET DEFAULT 'lg'::"public"."enum_pages_blocks_lead_text_text_size";
  ALTER TABLE "pages_blocks_lead_text" ALTER COLUMN "text_size" SET DATA TYPE "public"."enum_pages_blocks_lead_text_text_size" USING "text_size"::"public"."enum_pages_blocks_lead_text_text_size";
  ALTER TABLE "pages_blocks_link_tiles" ALTER COLUMN "tile_style" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_link_tiles" ALTER COLUMN "tile_style" SET DEFAULT 'standard'::text;
  DROP TYPE "public"."enum_pages_blocks_link_tiles_tile_style";
  CREATE TYPE "public"."enum_pages_blocks_link_tiles_tile_style" AS ENUM('standard', 'tall');
  ALTER TABLE "pages_blocks_link_tiles" ALTER COLUMN "tile_style" SET DEFAULT 'standard'::"public"."enum_pages_blocks_link_tiles_tile_style";
  ALTER TABLE "pages_blocks_link_tiles" ALTER COLUMN "tile_style" SET DATA TYPE "public"."enum_pages_blocks_link_tiles_tile_style" USING "tile_style"::"public"."enum_pages_blocks_link_tiles_tile_style";
  ALTER TABLE "_pages_v_blocks_lead_text" ALTER COLUMN "text_size" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_lead_text" ALTER COLUMN "text_size" SET DEFAULT 'lg'::text;
  DROP TYPE "public"."enum__pages_v_blocks_lead_text_text_size";
  CREATE TYPE "public"."enum__pages_v_blocks_lead_text_text_size" AS ENUM('lg', 'md');
  ALTER TABLE "_pages_v_blocks_lead_text" ALTER COLUMN "text_size" SET DEFAULT 'lg'::"public"."enum__pages_v_blocks_lead_text_text_size";
  ALTER TABLE "_pages_v_blocks_lead_text" ALTER COLUMN "text_size" SET DATA TYPE "public"."enum__pages_v_blocks_lead_text_text_size" USING "text_size"::"public"."enum__pages_v_blocks_lead_text_text_size";
  ALTER TABLE "_pages_v_blocks_link_tiles" ALTER COLUMN "tile_style" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_link_tiles" ALTER COLUMN "tile_style" SET DEFAULT 'standard'::text;
  DROP TYPE "public"."enum__pages_v_blocks_link_tiles_tile_style";
  CREATE TYPE "public"."enum__pages_v_blocks_link_tiles_tile_style" AS ENUM('standard', 'tall');
  ALTER TABLE "_pages_v_blocks_link_tiles" ALTER COLUMN "tile_style" SET DEFAULT 'standard'::"public"."enum__pages_v_blocks_link_tiles_tile_style";
  ALTER TABLE "_pages_v_blocks_link_tiles" ALTER COLUMN "tile_style" SET DATA TYPE "public"."enum__pages_v_blocks_link_tiles_tile_style" USING "tile_style"::"public"."enum__pages_v_blocks_link_tiles_tile_style";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "smaller_on_phones";
  ALTER TABLE "pages_blocks_section_nav" DROP COLUMN "bar_style";
  ALTER TABLE "pages_blocks_lead_text" DROP COLUMN "heading";
  ALTER TABLE "pages_blocks_lead_text" DROP COLUMN "band";
  ALTER TABLE "pages_blocks_link_tiles" DROP COLUMN "gradient_title";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "smaller_on_phones";
  ALTER TABLE "_pages_v_blocks_section_nav" DROP COLUMN "bar_style";
  ALTER TABLE "_pages_v_blocks_lead_text" DROP COLUMN "heading";
  ALTER TABLE "_pages_v_blocks_lead_text" DROP COLUMN "band";
  ALTER TABLE "_pages_v_blocks_link_tiles" DROP COLUMN "gradient_title";
  DROP TYPE "public"."enum_pages_blocks_section_nav_bar_style";
  DROP TYPE "public"."enum_pages_blocks_service_detail_links_appearance";
  DROP TYPE "public"."enum_pages_blocks_service_detail_links_type";
  DROP TYPE "public"."enum_pages_blocks_svc_list_items_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_section_nav_bar_style";
  DROP TYPE "public"."enum__pages_v_blocks_service_detail_links_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_service_detail_links_type";
  DROP TYPE "public"."enum__pages_v_blocks_svc_list_items_link_type";`)
}

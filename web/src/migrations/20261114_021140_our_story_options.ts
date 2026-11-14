import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_headline_size" AS ENUM('wrap', 'oneLine', 'fitted');
  CREATE TYPE "public"."enum_pages_blocks_hero_image_style" AS ENUM('dim', 'bright');
  CREATE TYPE "public"."enum_pages_blocks_section_nav_source" AS ENUM('sections', 'menu');
  CREATE TYPE "public"."enum_pages_blocks_lead_text_text_size" AS ENUM('lg', 'md');
  CREATE TYPE "public"."enum_pages_blocks_lead_text_highlight_mode" AS ENUM('none', 'tail', 'words');
  CREATE TYPE "public"."enum_pages_blocks_lead_text_closing_link_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_lead_text_closing_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum_pages_blocks_link_tiles_tile_style" AS ENUM('standard', 'tall');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_headline_size" AS ENUM('wrap', 'oneLine', 'fitted');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_image_style" AS ENUM('dim', 'bright');
  CREATE TYPE "public"."enum__pages_v_blocks_section_nav_source" AS ENUM('sections', 'menu');
  CREATE TYPE "public"."enum__pages_v_blocks_lead_text_text_size" AS ENUM('lg', 'md');
  CREATE TYPE "public"."enum__pages_v_blocks_lead_text_highlight_mode" AS ENUM('none', 'tail', 'words');
  CREATE TYPE "public"."enum__pages_v_blocks_lead_text_closing_link_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_lead_text_closing_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum__pages_v_blocks_link_tiles_tile_style" AS ENUM('standard', 'tall');
  ALTER TYPE "public"."enum_pages_blocks_lead_text_diagram" ADD VALUE 'weave';
  ALTER TYPE "public"."enum__pages_v_blocks_lead_text_diagram" ADD VALUE 'weave';
  CREATE TABLE "pages_blocks_lead_text_weave_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"tag" varchar,
  	"text" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_lead_text_weave_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"tag" varchar,
  	"text" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "headline_size" "enum_pages_blocks_hero_headline_size" DEFAULT 'wrap';
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "image_style" "enum_pages_blocks_hero_image_style" DEFAULT 'dim';
  ALTER TABLE "pages_blocks_section_nav" ADD COLUMN "source" "enum_pages_blocks_section_nav_source" DEFAULT 'sections';
  ALTER TABLE "pages_blocks_lead_text" ADD COLUMN "text_size" "enum_pages_blocks_lead_text_text_size" DEFAULT 'lg';
  ALTER TABLE "pages_blocks_lead_text" ADD COLUMN "highlight_mode" "enum_pages_blocks_lead_text_highlight_mode" DEFAULT 'tail';
  ALTER TABLE "pages_blocks_lead_text" ADD COLUMN "weave_start_label" varchar DEFAULT 'Previously separate';
  ALTER TABLE "pages_blocks_lead_text" ADD COLUMN "weave_end_label" varchar DEFAULT 'Now one business';
  ALTER TABLE "pages_blocks_lead_text" ADD COLUMN "weave_result" varchar DEFAULT 'PLG Acachet';
  ALTER TABLE "pages_blocks_lead_text" ADD COLUMN "weave_note" varchar;
  ALTER TABLE "pages_blocks_lead_text" ADD COLUMN "show_closing" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_lead_text" ADD COLUMN "closing_text" varchar;
  ALTER TABLE "pages_blocks_lead_text" ADD COLUMN "closing_link_label" varchar;
  ALTER TABLE "pages_blocks_lead_text" ADD COLUMN "closing_link_appearance" "enum_pages_blocks_lead_text_closing_link_appearance" DEFAULT 'primary';
  ALTER TABLE "pages_blocks_lead_text" ADD COLUMN "closing_link_type" "enum_pages_blocks_lead_text_closing_link_type" DEFAULT 'page';
  ALTER TABLE "pages_blocks_lead_text" ADD COLUMN "closing_link_page_id" integer;
  ALTER TABLE "pages_blocks_lead_text" ADD COLUMN "closing_link_section" varchar;
  ALTER TABLE "pages_blocks_lead_text" ADD COLUMN "closing_link_url" varchar;
  ALTER TABLE "pages_blocks_lead_text" ADD COLUMN "closing_link_new_tab" boolean;
  ALTER TABLE "pages_blocks_link_tiles" ADD COLUMN "tile_style" "enum_pages_blocks_link_tiles_tile_style" DEFAULT 'standard';
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "headline_size" "enum__pages_v_blocks_hero_headline_size" DEFAULT 'wrap';
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "image_style" "enum__pages_v_blocks_hero_image_style" DEFAULT 'dim';
  ALTER TABLE "_pages_v_blocks_section_nav" ADD COLUMN "source" "enum__pages_v_blocks_section_nav_source" DEFAULT 'sections';
  ALTER TABLE "_pages_v_blocks_lead_text" ADD COLUMN "text_size" "enum__pages_v_blocks_lead_text_text_size" DEFAULT 'lg';
  ALTER TABLE "_pages_v_blocks_lead_text" ADD COLUMN "highlight_mode" "enum__pages_v_blocks_lead_text_highlight_mode" DEFAULT 'tail';
  ALTER TABLE "_pages_v_blocks_lead_text" ADD COLUMN "weave_start_label" varchar DEFAULT 'Previously separate';
  ALTER TABLE "_pages_v_blocks_lead_text" ADD COLUMN "weave_end_label" varchar DEFAULT 'Now one business';
  ALTER TABLE "_pages_v_blocks_lead_text" ADD COLUMN "weave_result" varchar DEFAULT 'PLG Acachet';
  ALTER TABLE "_pages_v_blocks_lead_text" ADD COLUMN "weave_note" varchar;
  ALTER TABLE "_pages_v_blocks_lead_text" ADD COLUMN "show_closing" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_lead_text" ADD COLUMN "closing_text" varchar;
  ALTER TABLE "_pages_v_blocks_lead_text" ADD COLUMN "closing_link_label" varchar;
  ALTER TABLE "_pages_v_blocks_lead_text" ADD COLUMN "closing_link_appearance" "enum__pages_v_blocks_lead_text_closing_link_appearance" DEFAULT 'primary';
  ALTER TABLE "_pages_v_blocks_lead_text" ADD COLUMN "closing_link_type" "enum__pages_v_blocks_lead_text_closing_link_type" DEFAULT 'page';
  ALTER TABLE "_pages_v_blocks_lead_text" ADD COLUMN "closing_link_page_id" integer;
  ALTER TABLE "_pages_v_blocks_lead_text" ADD COLUMN "closing_link_section" varchar;
  ALTER TABLE "_pages_v_blocks_lead_text" ADD COLUMN "closing_link_url" varchar;
  ALTER TABLE "_pages_v_blocks_lead_text" ADD COLUMN "closing_link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_link_tiles" ADD COLUMN "tile_style" "enum__pages_v_blocks_link_tiles_tile_style" DEFAULT 'standard';
  ALTER TABLE "pages_blocks_lead_text_weave_items" ADD CONSTRAINT "pages_blocks_lead_text_weave_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_lead_text_weave_items" ADD CONSTRAINT "pages_blocks_lead_text_weave_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lead_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lead_text_weave_items" ADD CONSTRAINT "_pages_v_blocks_lead_text_weave_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lead_text_weave_items" ADD CONSTRAINT "_pages_v_blocks_lead_text_weave_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lead_text"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_lead_text_weave_items_order_idx" ON "pages_blocks_lead_text_weave_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_lead_text_weave_items_parent_id_idx" ON "pages_blocks_lead_text_weave_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lead_text_weave_items_image_idx" ON "pages_blocks_lead_text_weave_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_lead_text_weave_items_order_idx" ON "_pages_v_blocks_lead_text_weave_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lead_text_weave_items_parent_id_idx" ON "_pages_v_blocks_lead_text_weave_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lead_text_weave_items_image_idx" ON "_pages_v_blocks_lead_text_weave_items" USING btree ("image_id");
  ALTER TABLE "pages_blocks_lead_text" ADD CONSTRAINT "pages_blocks_lead_text_closing_link_page_id_pages_id_fk" FOREIGN KEY ("closing_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lead_text" ADD CONSTRAINT "_pages_v_blocks_lead_text_closing_link_page_id_pages_id_fk" FOREIGN KEY ("closing_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_lead_text_closing_link_closing_link_page_idx" ON "pages_blocks_lead_text" USING btree ("closing_link_page_id");
  CREATE INDEX "_pages_v_blocks_lead_text_closing_link_closing_link_page_idx" ON "_pages_v_blocks_lead_text" USING btree ("closing_link_page_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_lead_text_weave_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_lead_text_weave_items" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_lead_text_weave_items" CASCADE;
  DROP TABLE "_pages_v_blocks_lead_text_weave_items" CASCADE;
  ALTER TABLE "pages_blocks_lead_text" DROP CONSTRAINT "pages_blocks_lead_text_closing_link_page_id_pages_id_fk";
  
  ALTER TABLE "_pages_v_blocks_lead_text" DROP CONSTRAINT "_pages_v_blocks_lead_text_closing_link_page_id_pages_id_fk";
  
  ALTER TABLE "pages_blocks_lead_text" ALTER COLUMN "diagram" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_lead_text" ALTER COLUMN "diagram" SET DEFAULT 'none'::text;
  DROP TYPE "public"."enum_pages_blocks_lead_text_diagram";
  CREATE TYPE "public"."enum_pages_blocks_lead_text_diagram" AS ENUM('none', 'merge');
  ALTER TABLE "pages_blocks_lead_text" ALTER COLUMN "diagram" SET DEFAULT 'none'::"public"."enum_pages_blocks_lead_text_diagram";
  ALTER TABLE "pages_blocks_lead_text" ALTER COLUMN "diagram" SET DATA TYPE "public"."enum_pages_blocks_lead_text_diagram" USING "diagram"::"public"."enum_pages_blocks_lead_text_diagram";
  ALTER TABLE "_pages_v_blocks_lead_text" ALTER COLUMN "diagram" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_lead_text" ALTER COLUMN "diagram" SET DEFAULT 'none'::text;
  DROP TYPE "public"."enum__pages_v_blocks_lead_text_diagram";
  CREATE TYPE "public"."enum__pages_v_blocks_lead_text_diagram" AS ENUM('none', 'merge');
  ALTER TABLE "_pages_v_blocks_lead_text" ALTER COLUMN "diagram" SET DEFAULT 'none'::"public"."enum__pages_v_blocks_lead_text_diagram";
  ALTER TABLE "_pages_v_blocks_lead_text" ALTER COLUMN "diagram" SET DATA TYPE "public"."enum__pages_v_blocks_lead_text_diagram" USING "diagram"::"public"."enum__pages_v_blocks_lead_text_diagram";
  DROP INDEX "pages_blocks_lead_text_closing_link_closing_link_page_idx";
  DROP INDEX "_pages_v_blocks_lead_text_closing_link_closing_link_page_idx";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "headline_size";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "image_style";
  ALTER TABLE "pages_blocks_section_nav" DROP COLUMN "source";
  ALTER TABLE "pages_blocks_lead_text" DROP COLUMN "text_size";
  ALTER TABLE "pages_blocks_lead_text" DROP COLUMN "highlight_mode";
  ALTER TABLE "pages_blocks_lead_text" DROP COLUMN "weave_start_label";
  ALTER TABLE "pages_blocks_lead_text" DROP COLUMN "weave_end_label";
  ALTER TABLE "pages_blocks_lead_text" DROP COLUMN "weave_result";
  ALTER TABLE "pages_blocks_lead_text" DROP COLUMN "weave_note";
  ALTER TABLE "pages_blocks_lead_text" DROP COLUMN "show_closing";
  ALTER TABLE "pages_blocks_lead_text" DROP COLUMN "closing_text";
  ALTER TABLE "pages_blocks_lead_text" DROP COLUMN "closing_link_label";
  ALTER TABLE "pages_blocks_lead_text" DROP COLUMN "closing_link_appearance";
  ALTER TABLE "pages_blocks_lead_text" DROP COLUMN "closing_link_type";
  ALTER TABLE "pages_blocks_lead_text" DROP COLUMN "closing_link_page_id";
  ALTER TABLE "pages_blocks_lead_text" DROP COLUMN "closing_link_section";
  ALTER TABLE "pages_blocks_lead_text" DROP COLUMN "closing_link_url";
  ALTER TABLE "pages_blocks_lead_text" DROP COLUMN "closing_link_new_tab";
  ALTER TABLE "pages_blocks_link_tiles" DROP COLUMN "tile_style";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "headline_size";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "image_style";
  ALTER TABLE "_pages_v_blocks_section_nav" DROP COLUMN "source";
  ALTER TABLE "_pages_v_blocks_lead_text" DROP COLUMN "text_size";
  ALTER TABLE "_pages_v_blocks_lead_text" DROP COLUMN "highlight_mode";
  ALTER TABLE "_pages_v_blocks_lead_text" DROP COLUMN "weave_start_label";
  ALTER TABLE "_pages_v_blocks_lead_text" DROP COLUMN "weave_end_label";
  ALTER TABLE "_pages_v_blocks_lead_text" DROP COLUMN "weave_result";
  ALTER TABLE "_pages_v_blocks_lead_text" DROP COLUMN "weave_note";
  ALTER TABLE "_pages_v_blocks_lead_text" DROP COLUMN "show_closing";
  ALTER TABLE "_pages_v_blocks_lead_text" DROP COLUMN "closing_text";
  ALTER TABLE "_pages_v_blocks_lead_text" DROP COLUMN "closing_link_label";
  ALTER TABLE "_pages_v_blocks_lead_text" DROP COLUMN "closing_link_appearance";
  ALTER TABLE "_pages_v_blocks_lead_text" DROP COLUMN "closing_link_type";
  ALTER TABLE "_pages_v_blocks_lead_text" DROP COLUMN "closing_link_page_id";
  ALTER TABLE "_pages_v_blocks_lead_text" DROP COLUMN "closing_link_section";
  ALTER TABLE "_pages_v_blocks_lead_text" DROP COLUMN "closing_link_url";
  ALTER TABLE "_pages_v_blocks_lead_text" DROP COLUMN "closing_link_new_tab";
  ALTER TABLE "_pages_v_blocks_link_tiles" DROP COLUMN "tile_style";
  DROP TYPE "public"."enum_pages_blocks_hero_headline_size";
  DROP TYPE "public"."enum_pages_blocks_hero_image_style";
  DROP TYPE "public"."enum_pages_blocks_section_nav_source";
  DROP TYPE "public"."enum_pages_blocks_lead_text_text_size";
  DROP TYPE "public"."enum_pages_blocks_lead_text_highlight_mode";
  DROP TYPE "public"."enum_pages_blocks_lead_text_closing_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_lead_text_closing_link_type";
  DROP TYPE "public"."enum_pages_blocks_link_tiles_tile_style";
  DROP TYPE "public"."enum__pages_v_blocks_hero_headline_size";
  DROP TYPE "public"."enum__pages_v_blocks_hero_image_style";
  DROP TYPE "public"."enum__pages_v_blocks_section_nav_source";
  DROP TYPE "public"."enum__pages_v_blocks_lead_text_text_size";
  DROP TYPE "public"."enum__pages_v_blocks_lead_text_highlight_mode";
  DROP TYPE "public"."enum__pages_v_blocks_lead_text_closing_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_lead_text_closing_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_link_tiles_tile_style";`)
}

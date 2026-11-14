import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_lead_text_animation" AS ENUM('scrollReveal', 'none');
  CREATE TYPE "public"."enum_pages_blocks_lead_text_diagram" AS ENUM('none', 'merge');
  CREATE TYPE "public"."enum_pages_blocks_media_text_variant" AS ENUM('fade', 'card');
  CREATE TYPE "public"."enum_pages_blocks_link_tiles_tiles_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum_pages_blocks_cta_banner_custom_link_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_cta_banner_custom_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum__pages_v_blocks_lead_text_animation" AS ENUM('scrollReveal', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_lead_text_diagram" AS ENUM('none', 'merge');
  CREATE TYPE "public"."enum__pages_v_blocks_media_text_variant" AS ENUM('fade', 'card');
  CREATE TYPE "public"."enum__pages_v_blocks_link_tiles_tiles_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_banner_custom_link_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_banner_custom_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum_site_settings_header_links_sub_links_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum_site_settings_cta_link_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum_site_settings_cta_link_type" AS ENUM('page', 'section', 'url');
  ALTER TYPE "public"."enum_pages_blocks_hero_variant" ADD VALUE 'page' BEFORE 'showreel';
  ALTER TYPE "public"."enum_pages_blocks_card_carousel_card_style" ADD VALUE 'pillar';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_variant" ADD VALUE 'page' BEFORE 'showreel';
  ALTER TYPE "public"."enum__pages_v_blocks_card_carousel_card_style" ADD VALUE 'pillar';
  CREATE TABLE "pages_blocks_section_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"note" varchar,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_lead_text_merge_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"name" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_lead_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"text" varchar,
  	"highlight" varchar,
  	"animation" "enum_pages_blocks_lead_text_animation" DEFAULT 'scrollReveal',
  	"diagram" "enum_pages_blocks_lead_text_diagram" DEFAULT 'none',
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media_text_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_media_text_report_bars" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" numeric
  );
  
  CREATE TABLE "pages_blocks_statements_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_statements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"gradient_title" boolean DEFAULT true,
  	"show_brand_mark" boolean DEFAULT true,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_background_text_ticker" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_background_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"gradient_title" boolean DEFAULT true,
  	"text" varchar,
  	"image_id" integer,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_ownership_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_ownership_levels" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"tag" varchar,
  	"detail" varchar,
  	"text" varchar,
  	"figure" varchar,
  	"figure_label" varchar
  );
  
  CREATE TABLE "pages_blocks_ownership" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"body" jsonb,
  	"closing" jsonb,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_link_tiles_tiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"image_id" integer,
  	"link_label" varchar,
  	"link_type" "enum_pages_blocks_link_tiles_tiles_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_section" varchar,
  	"link_url" varchar,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "pages_blocks_link_tiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"use_default" boolean DEFAULT true,
  	"custom_eyebrow" varchar,
  	"custom_title" varchar,
  	"custom_lede" varchar,
  	"custom_link_label" varchar,
  	"custom_link_appearance" "enum_pages_blocks_cta_banner_custom_link_appearance" DEFAULT 'primary',
  	"custom_link_type" "enum_pages_blocks_cta_banner_custom_link_type" DEFAULT 'page',
  	"custom_link_page_id" integer,
  	"custom_link_section" varchar,
  	"custom_link_url" varchar,
  	"custom_link_new_tab" boolean,
  	"custom_image_id" integer,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_section_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"note" varchar,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lead_text_merge_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"name" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lead_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"text" varchar,
  	"highlight" varchar,
  	"animation" "enum__pages_v_blocks_lead_text_animation" DEFAULT 'scrollReveal',
  	"diagram" "enum__pages_v_blocks_lead_text_diagram" DEFAULT 'none',
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_text_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_text_report_bars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_statements_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_statements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"gradient_title" boolean DEFAULT true,
  	"show_brand_mark" boolean DEFAULT true,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_background_text_ticker" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_background_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"gradient_title" boolean DEFAULT true,
  	"text" varchar,
  	"image_id" integer,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ownership_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ownership_levels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"tag" varchar,
  	"detail" varchar,
  	"text" varchar,
  	"figure" varchar,
  	"figure_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ownership" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"body" jsonb,
  	"closing" jsonb,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_link_tiles_tiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"image_id" integer,
  	"link_label" varchar,
  	"link_type" "enum__pages_v_blocks_link_tiles_tiles_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_section" varchar,
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_link_tiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"use_default" boolean DEFAULT true,
  	"custom_eyebrow" varchar,
  	"custom_title" varchar,
  	"custom_lede" varchar,
  	"custom_link_label" varchar,
  	"custom_link_appearance" "enum__pages_v_blocks_cta_banner_custom_link_appearance" DEFAULT 'primary',
  	"custom_link_type" "enum__pages_v_blocks_cta_banner_custom_link_type" DEFAULT 'page',
  	"custom_link_page_id" integer,
  	"custom_link_section" varchar,
  	"custom_link_url" varchar,
  	"custom_link_new_tab" boolean,
  	"custom_image_id" integer,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "site_settings_header_links_sub_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_site_settings_header_links_sub_links_type" DEFAULT 'page',
  	"page_id" integer,
  	"section" varchar,
  	"url" varchar,
  	"new_tab" boolean
  );
  
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'page';
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'page';
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "highlight_last_word" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "intro" jsonb;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "show_brand_mark" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_media_text" ADD COLUMN "variant" "enum_pages_blocks_media_text_variant" DEFAULT 'fade';
  ALTER TABLE "pages_blocks_media_text" ADD COLUMN "list_heading" varchar;
  ALTER TABLE "pages_blocks_media_text" ADD COLUMN "report_title" varchar;
  ALTER TABLE "pages_blocks_media_text" ADD COLUMN "report_badge" varchar DEFAULT 'Live';
  ALTER TABLE "pages_blocks_media_text" ADD COLUMN "report_caption" varchar;
  ALTER TABLE "pages_blocks_card_carousel_cards" ADD COLUMN "tag" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "highlight_last_word" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "intro" jsonb;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "show_brand_mark" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_media_text" ADD COLUMN "variant" "enum__pages_v_blocks_media_text_variant" DEFAULT 'fade';
  ALTER TABLE "_pages_v_blocks_media_text" ADD COLUMN "list_heading" varchar;
  ALTER TABLE "_pages_v_blocks_media_text" ADD COLUMN "report_title" varchar;
  ALTER TABLE "_pages_v_blocks_media_text" ADD COLUMN "report_badge" varchar DEFAULT 'Live';
  ALTER TABLE "_pages_v_blocks_media_text" ADD COLUMN "report_caption" varchar;
  ALTER TABLE "_pages_v_blocks_card_carousel_cards" ADD COLUMN "tag" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "cta_eyebrow" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "cta_title" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "cta_lede" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "cta_link_label" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "cta_link_appearance" "enum_site_settings_cta_link_appearance" DEFAULT 'primary';
  ALTER TABLE "site_settings" ADD COLUMN "cta_link_type" "enum_site_settings_cta_link_type" DEFAULT 'page';
  ALTER TABLE "site_settings" ADD COLUMN "cta_link_page_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "cta_link_section" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "cta_link_url" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "cta_link_new_tab" boolean;
  ALTER TABLE "site_settings" ADD COLUMN "cta_image_id" integer;
  ALTER TABLE "pages_blocks_section_nav" ADD CONSTRAINT "pages_blocks_section_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lead_text_merge_items" ADD CONSTRAINT "pages_blocks_lead_text_merge_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lead_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lead_text" ADD CONSTRAINT "pages_blocks_lead_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_text_list_items" ADD CONSTRAINT "pages_blocks_media_text_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_media_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_text_report_bars" ADD CONSTRAINT "pages_blocks_media_text_report_bars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_media_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_statements_items" ADD CONSTRAINT "pages_blocks_statements_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_statements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_statements" ADD CONSTRAINT "pages_blocks_statements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_background_text_ticker" ADD CONSTRAINT "pages_blocks_background_text_ticker_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_background_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_background_text" ADD CONSTRAINT "pages_blocks_background_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_background_text" ADD CONSTRAINT "pages_blocks_background_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ownership_facts" ADD CONSTRAINT "pages_blocks_ownership_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ownership"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ownership_levels" ADD CONSTRAINT "pages_blocks_ownership_levels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ownership"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ownership" ADD CONSTRAINT "pages_blocks_ownership_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_link_tiles_tiles" ADD CONSTRAINT "pages_blocks_link_tiles_tiles_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_link_tiles_tiles" ADD CONSTRAINT "pages_blocks_link_tiles_tiles_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_link_tiles_tiles" ADD CONSTRAINT "pages_blocks_link_tiles_tiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_link_tiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_link_tiles" ADD CONSTRAINT "pages_blocks_link_tiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_banner" ADD CONSTRAINT "pages_blocks_cta_banner_custom_link_page_id_pages_id_fk" FOREIGN KEY ("custom_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_banner" ADD CONSTRAINT "pages_blocks_cta_banner_custom_image_id_media_id_fk" FOREIGN KEY ("custom_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_banner" ADD CONSTRAINT "pages_blocks_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_section_nav" ADD CONSTRAINT "_pages_v_blocks_section_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lead_text_merge_items" ADD CONSTRAINT "_pages_v_blocks_lead_text_merge_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lead_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lead_text" ADD CONSTRAINT "_pages_v_blocks_lead_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_text_list_items" ADD CONSTRAINT "_pages_v_blocks_media_text_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_media_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_text_report_bars" ADD CONSTRAINT "_pages_v_blocks_media_text_report_bars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_media_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_statements_items" ADD CONSTRAINT "_pages_v_blocks_statements_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_statements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_statements" ADD CONSTRAINT "_pages_v_blocks_statements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_background_text_ticker" ADD CONSTRAINT "_pages_v_blocks_background_text_ticker_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_background_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_background_text" ADD CONSTRAINT "_pages_v_blocks_background_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_background_text" ADD CONSTRAINT "_pages_v_blocks_background_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ownership_facts" ADD CONSTRAINT "_pages_v_blocks_ownership_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ownership"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ownership_levels" ADD CONSTRAINT "_pages_v_blocks_ownership_levels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ownership"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ownership" ADD CONSTRAINT "_pages_v_blocks_ownership_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_link_tiles_tiles" ADD CONSTRAINT "_pages_v_blocks_link_tiles_tiles_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_link_tiles_tiles" ADD CONSTRAINT "_pages_v_blocks_link_tiles_tiles_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_link_tiles_tiles" ADD CONSTRAINT "_pages_v_blocks_link_tiles_tiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_link_tiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_link_tiles" ADD CONSTRAINT "_pages_v_blocks_link_tiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_banner" ADD CONSTRAINT "_pages_v_blocks_cta_banner_custom_link_page_id_pages_id_fk" FOREIGN KEY ("custom_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_banner" ADD CONSTRAINT "_pages_v_blocks_cta_banner_custom_image_id_media_id_fk" FOREIGN KEY ("custom_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_banner" ADD CONSTRAINT "_pages_v_blocks_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_header_links_sub_links" ADD CONSTRAINT "site_settings_header_links_sub_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_header_links_sub_links" ADD CONSTRAINT "site_settings_header_links_sub_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_header_links"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_section_nav_order_idx" ON "pages_blocks_section_nav" USING btree ("_order");
  CREATE INDEX "pages_blocks_section_nav_parent_id_idx" ON "pages_blocks_section_nav" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_section_nav_path_idx" ON "pages_blocks_section_nav" USING btree ("_path");
  CREATE INDEX "pages_blocks_lead_text_merge_items_order_idx" ON "pages_blocks_lead_text_merge_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_lead_text_merge_items_parent_id_idx" ON "pages_blocks_lead_text_merge_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lead_text_order_idx" ON "pages_blocks_lead_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_lead_text_parent_id_idx" ON "pages_blocks_lead_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lead_text_path_idx" ON "pages_blocks_lead_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_text_list_items_order_idx" ON "pages_blocks_media_text_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_text_list_items_parent_id_idx" ON "pages_blocks_media_text_list_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_text_report_bars_order_idx" ON "pages_blocks_media_text_report_bars" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_text_report_bars_parent_id_idx" ON "pages_blocks_media_text_report_bars" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_statements_items_order_idx" ON "pages_blocks_statements_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_statements_items_parent_id_idx" ON "pages_blocks_statements_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_statements_order_idx" ON "pages_blocks_statements" USING btree ("_order");
  CREATE INDEX "pages_blocks_statements_parent_id_idx" ON "pages_blocks_statements" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_statements_path_idx" ON "pages_blocks_statements" USING btree ("_path");
  CREATE INDEX "pages_blocks_background_text_ticker_order_idx" ON "pages_blocks_background_text_ticker" USING btree ("_order");
  CREATE INDEX "pages_blocks_background_text_ticker_parent_id_idx" ON "pages_blocks_background_text_ticker" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_background_text_order_idx" ON "pages_blocks_background_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_background_text_parent_id_idx" ON "pages_blocks_background_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_background_text_path_idx" ON "pages_blocks_background_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_background_text_image_idx" ON "pages_blocks_background_text" USING btree ("image_id");
  CREATE INDEX "pages_blocks_ownership_facts_order_idx" ON "pages_blocks_ownership_facts" USING btree ("_order");
  CREATE INDEX "pages_blocks_ownership_facts_parent_id_idx" ON "pages_blocks_ownership_facts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ownership_levels_order_idx" ON "pages_blocks_ownership_levels" USING btree ("_order");
  CREATE INDEX "pages_blocks_ownership_levels_parent_id_idx" ON "pages_blocks_ownership_levels" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ownership_order_idx" ON "pages_blocks_ownership" USING btree ("_order");
  CREATE INDEX "pages_blocks_ownership_parent_id_idx" ON "pages_blocks_ownership" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ownership_path_idx" ON "pages_blocks_ownership" USING btree ("_path");
  CREATE INDEX "pages_blocks_link_tiles_tiles_order_idx" ON "pages_blocks_link_tiles_tiles" USING btree ("_order");
  CREATE INDEX "pages_blocks_link_tiles_tiles_parent_id_idx" ON "pages_blocks_link_tiles_tiles" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_link_tiles_tiles_image_idx" ON "pages_blocks_link_tiles_tiles" USING btree ("image_id");
  CREATE INDEX "pages_blocks_link_tiles_tiles_link_link_page_idx" ON "pages_blocks_link_tiles_tiles" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_link_tiles_order_idx" ON "pages_blocks_link_tiles" USING btree ("_order");
  CREATE INDEX "pages_blocks_link_tiles_parent_id_idx" ON "pages_blocks_link_tiles" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_link_tiles_path_idx" ON "pages_blocks_link_tiles" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_banner_order_idx" ON "pages_blocks_cta_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_banner_parent_id_idx" ON "pages_blocks_cta_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_banner_path_idx" ON "pages_blocks_cta_banner" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_banner_custom_link_custom_link_page_idx" ON "pages_blocks_cta_banner" USING btree ("custom_link_page_id");
  CREATE INDEX "pages_blocks_cta_banner_custom_custom_image_idx" ON "pages_blocks_cta_banner" USING btree ("custom_image_id");
  CREATE INDEX "_pages_v_blocks_section_nav_order_idx" ON "_pages_v_blocks_section_nav" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_section_nav_parent_id_idx" ON "_pages_v_blocks_section_nav" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_section_nav_path_idx" ON "_pages_v_blocks_section_nav" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_lead_text_merge_items_order_idx" ON "_pages_v_blocks_lead_text_merge_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lead_text_merge_items_parent_id_idx" ON "_pages_v_blocks_lead_text_merge_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lead_text_order_idx" ON "_pages_v_blocks_lead_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lead_text_parent_id_idx" ON "_pages_v_blocks_lead_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lead_text_path_idx" ON "_pages_v_blocks_lead_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_text_list_items_order_idx" ON "_pages_v_blocks_media_text_list_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_text_list_items_parent_id_idx" ON "_pages_v_blocks_media_text_list_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_text_report_bars_order_idx" ON "_pages_v_blocks_media_text_report_bars" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_text_report_bars_parent_id_idx" ON "_pages_v_blocks_media_text_report_bars" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_statements_items_order_idx" ON "_pages_v_blocks_statements_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_statements_items_parent_id_idx" ON "_pages_v_blocks_statements_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_statements_order_idx" ON "_pages_v_blocks_statements" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_statements_parent_id_idx" ON "_pages_v_blocks_statements" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_statements_path_idx" ON "_pages_v_blocks_statements" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_background_text_ticker_order_idx" ON "_pages_v_blocks_background_text_ticker" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_background_text_ticker_parent_id_idx" ON "_pages_v_blocks_background_text_ticker" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_background_text_order_idx" ON "_pages_v_blocks_background_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_background_text_parent_id_idx" ON "_pages_v_blocks_background_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_background_text_path_idx" ON "_pages_v_blocks_background_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_background_text_image_idx" ON "_pages_v_blocks_background_text" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_ownership_facts_order_idx" ON "_pages_v_blocks_ownership_facts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ownership_facts_parent_id_idx" ON "_pages_v_blocks_ownership_facts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ownership_levels_order_idx" ON "_pages_v_blocks_ownership_levels" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ownership_levels_parent_id_idx" ON "_pages_v_blocks_ownership_levels" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ownership_order_idx" ON "_pages_v_blocks_ownership" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ownership_parent_id_idx" ON "_pages_v_blocks_ownership" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ownership_path_idx" ON "_pages_v_blocks_ownership" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_link_tiles_tiles_order_idx" ON "_pages_v_blocks_link_tiles_tiles" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_link_tiles_tiles_parent_id_idx" ON "_pages_v_blocks_link_tiles_tiles" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_link_tiles_tiles_image_idx" ON "_pages_v_blocks_link_tiles_tiles" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_link_tiles_tiles_link_link_page_idx" ON "_pages_v_blocks_link_tiles_tiles" USING btree ("link_page_id");
  CREATE INDEX "_pages_v_blocks_link_tiles_order_idx" ON "_pages_v_blocks_link_tiles" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_link_tiles_parent_id_idx" ON "_pages_v_blocks_link_tiles" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_link_tiles_path_idx" ON "_pages_v_blocks_link_tiles" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_banner_order_idx" ON "_pages_v_blocks_cta_banner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_banner_parent_id_idx" ON "_pages_v_blocks_cta_banner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_banner_path_idx" ON "_pages_v_blocks_cta_banner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_banner_custom_link_custom_link_page_idx" ON "_pages_v_blocks_cta_banner" USING btree ("custom_link_page_id");
  CREATE INDEX "_pages_v_blocks_cta_banner_custom_custom_image_idx" ON "_pages_v_blocks_cta_banner" USING btree ("custom_image_id");
  CREATE INDEX "site_settings_header_links_sub_links_order_idx" ON "site_settings_header_links_sub_links" USING btree ("_order");
  CREATE INDEX "site_settings_header_links_sub_links_parent_id_idx" ON "site_settings_header_links_sub_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_header_links_sub_links_page_idx" ON "site_settings_header_links_sub_links" USING btree ("page_id");
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_cta_link_page_id_pages_id_fk" FOREIGN KEY ("cta_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_cta_image_id_media_id_fk" FOREIGN KEY ("cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "site_settings_cta_link_cta_link_page_idx" ON "site_settings" USING btree ("cta_link_page_id");
  CREATE INDEX "site_settings_cta_cta_image_idx" ON "site_settings" USING btree ("cta_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_section_nav" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_lead_text_merge_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_lead_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_media_text_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_media_text_report_bars" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_statements_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_statements" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_background_text_ticker" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_background_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_ownership_facts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_ownership_levels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_ownership" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_link_tiles_tiles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_link_tiles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_section_nav" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_lead_text_merge_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_lead_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_media_text_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_media_text_report_bars" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_statements_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_statements" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_background_text_ticker" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_background_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_ownership_facts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_ownership_levels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_ownership" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_link_tiles_tiles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_link_tiles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_header_links_sub_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_section_nav" CASCADE;
  DROP TABLE "pages_blocks_lead_text_merge_items" CASCADE;
  DROP TABLE "pages_blocks_lead_text" CASCADE;
  DROP TABLE "pages_blocks_media_text_list_items" CASCADE;
  DROP TABLE "pages_blocks_media_text_report_bars" CASCADE;
  DROP TABLE "pages_blocks_statements_items" CASCADE;
  DROP TABLE "pages_blocks_statements" CASCADE;
  DROP TABLE "pages_blocks_background_text_ticker" CASCADE;
  DROP TABLE "pages_blocks_background_text" CASCADE;
  DROP TABLE "pages_blocks_ownership_facts" CASCADE;
  DROP TABLE "pages_blocks_ownership_levels" CASCADE;
  DROP TABLE "pages_blocks_ownership" CASCADE;
  DROP TABLE "pages_blocks_link_tiles_tiles" CASCADE;
  DROP TABLE "pages_blocks_link_tiles" CASCADE;
  DROP TABLE "pages_blocks_cta_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_section_nav" CASCADE;
  DROP TABLE "_pages_v_blocks_lead_text_merge_items" CASCADE;
  DROP TABLE "_pages_v_blocks_lead_text" CASCADE;
  DROP TABLE "_pages_v_blocks_media_text_list_items" CASCADE;
  DROP TABLE "_pages_v_blocks_media_text_report_bars" CASCADE;
  DROP TABLE "_pages_v_blocks_statements_items" CASCADE;
  DROP TABLE "_pages_v_blocks_statements" CASCADE;
  DROP TABLE "_pages_v_blocks_background_text_ticker" CASCADE;
  DROP TABLE "_pages_v_blocks_background_text" CASCADE;
  DROP TABLE "_pages_v_blocks_ownership_facts" CASCADE;
  DROP TABLE "_pages_v_blocks_ownership_levels" CASCADE;
  DROP TABLE "_pages_v_blocks_ownership" CASCADE;
  DROP TABLE "_pages_v_blocks_link_tiles_tiles" CASCADE;
  DROP TABLE "_pages_v_blocks_link_tiles" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_banner" CASCADE;
  DROP TABLE "site_settings_header_links_sub_links" CASCADE;
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_cta_link_page_id_pages_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_cta_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'showreel'::text;
  DROP TYPE "public"."enum_pages_blocks_hero_variant";
  CREATE TYPE "public"."enum_pages_blocks_hero_variant" AS ENUM('showreel');
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'showreel'::"public"."enum_pages_blocks_hero_variant";
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE "public"."enum_pages_blocks_hero_variant" USING "variant"::"public"."enum_pages_blocks_hero_variant";
  ALTER TABLE "pages_blocks_card_carousel" ALTER COLUMN "card_style" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_card_carousel" ALTER COLUMN "card_style" SET DEFAULT 'service'::text;
  DROP TYPE "public"."enum_pages_blocks_card_carousel_card_style";
  CREATE TYPE "public"."enum_pages_blocks_card_carousel_card_style" AS ENUM('service');
  ALTER TABLE "pages_blocks_card_carousel" ALTER COLUMN "card_style" SET DEFAULT 'service'::"public"."enum_pages_blocks_card_carousel_card_style";
  ALTER TABLE "pages_blocks_card_carousel" ALTER COLUMN "card_style" SET DATA TYPE "public"."enum_pages_blocks_card_carousel_card_style" USING "card_style"::"public"."enum_pages_blocks_card_carousel_card_style";
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'showreel'::text;
  DROP TYPE "public"."enum__pages_v_blocks_hero_variant";
  CREATE TYPE "public"."enum__pages_v_blocks_hero_variant" AS ENUM('showreel');
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'showreel'::"public"."enum__pages_v_blocks_hero_variant";
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE "public"."enum__pages_v_blocks_hero_variant" USING "variant"::"public"."enum__pages_v_blocks_hero_variant";
  ALTER TABLE "_pages_v_blocks_card_carousel" ALTER COLUMN "card_style" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_card_carousel" ALTER COLUMN "card_style" SET DEFAULT 'service'::text;
  DROP TYPE "public"."enum__pages_v_blocks_card_carousel_card_style";
  CREATE TYPE "public"."enum__pages_v_blocks_card_carousel_card_style" AS ENUM('service');
  ALTER TABLE "_pages_v_blocks_card_carousel" ALTER COLUMN "card_style" SET DEFAULT 'service'::"public"."enum__pages_v_blocks_card_carousel_card_style";
  ALTER TABLE "_pages_v_blocks_card_carousel" ALTER COLUMN "card_style" SET DATA TYPE "public"."enum__pages_v_blocks_card_carousel_card_style" USING "card_style"::"public"."enum__pages_v_blocks_card_carousel_card_style";
  DROP INDEX "site_settings_cta_link_cta_link_page_idx";
  DROP INDEX "site_settings_cta_cta_image_idx";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "highlight_last_word";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "intro";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "show_brand_mark";
  ALTER TABLE "pages_blocks_media_text" DROP COLUMN "variant";
  ALTER TABLE "pages_blocks_media_text" DROP COLUMN "list_heading";
  ALTER TABLE "pages_blocks_media_text" DROP COLUMN "report_title";
  ALTER TABLE "pages_blocks_media_text" DROP COLUMN "report_badge";
  ALTER TABLE "pages_blocks_media_text" DROP COLUMN "report_caption";
  ALTER TABLE "pages_blocks_card_carousel_cards" DROP COLUMN "tag";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "highlight_last_word";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "intro";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "show_brand_mark";
  ALTER TABLE "_pages_v_blocks_media_text" DROP COLUMN "variant";
  ALTER TABLE "_pages_v_blocks_media_text" DROP COLUMN "list_heading";
  ALTER TABLE "_pages_v_blocks_media_text" DROP COLUMN "report_title";
  ALTER TABLE "_pages_v_blocks_media_text" DROP COLUMN "report_badge";
  ALTER TABLE "_pages_v_blocks_media_text" DROP COLUMN "report_caption";
  ALTER TABLE "_pages_v_blocks_card_carousel_cards" DROP COLUMN "tag";
  ALTER TABLE "site_settings" DROP COLUMN "cta_eyebrow";
  ALTER TABLE "site_settings" DROP COLUMN "cta_title";
  ALTER TABLE "site_settings" DROP COLUMN "cta_lede";
  ALTER TABLE "site_settings" DROP COLUMN "cta_link_label";
  ALTER TABLE "site_settings" DROP COLUMN "cta_link_appearance";
  ALTER TABLE "site_settings" DROP COLUMN "cta_link_type";
  ALTER TABLE "site_settings" DROP COLUMN "cta_link_page_id";
  ALTER TABLE "site_settings" DROP COLUMN "cta_link_section";
  ALTER TABLE "site_settings" DROP COLUMN "cta_link_url";
  ALTER TABLE "site_settings" DROP COLUMN "cta_link_new_tab";
  ALTER TABLE "site_settings" DROP COLUMN "cta_image_id";
  DROP TYPE "public"."enum_pages_blocks_lead_text_animation";
  DROP TYPE "public"."enum_pages_blocks_lead_text_diagram";
  DROP TYPE "public"."enum_pages_blocks_media_text_variant";
  DROP TYPE "public"."enum_pages_blocks_link_tiles_tiles_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_banner_custom_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_cta_banner_custom_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_lead_text_animation";
  DROP TYPE "public"."enum__pages_v_blocks_lead_text_diagram";
  DROP TYPE "public"."enum__pages_v_blocks_media_text_variant";
  DROP TYPE "public"."enum__pages_v_blocks_link_tiles_tiles_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_banner_custom_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_cta_banner_custom_link_type";
  DROP TYPE "public"."enum_site_settings_header_links_sub_links_type";
  DROP TYPE "public"."enum_site_settings_cta_link_appearance";
  DROP TYPE "public"."enum_site_settings_cta_link_type";`)
}

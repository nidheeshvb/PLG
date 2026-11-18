import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_links_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_hero_links_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum_pages_blocks_hero_variant" AS ENUM('page', 'showreel');
  CREATE TYPE "public"."enum_pages_blocks_hero_headline_size" AS ENUM('wrap', 'oneLine', 'fitted');
  CREATE TYPE "public"."enum_pages_blocks_hero_image_style" AS ENUM('dim', 'bright');
  CREATE TYPE "public"."enum_pages_blocks_section_nav_source" AS ENUM('sections', 'menu');
  CREATE TYPE "public"."enum_pages_blocks_section_nav_bar_style" AS ENUM('bar', 'sticky');
  CREATE TYPE "public"."enum_pages_blocks_lead_text_text_size" AS ENUM('lg', 'md', 'sm');
  CREATE TYPE "public"."enum_pages_blocks_lead_text_animation" AS ENUM('scrollReveal', 'none');
  CREATE TYPE "public"."enum_pages_blocks_lead_text_highlight_mode" AS ENUM('none', 'tail', 'words', 'phrase');
  CREATE TYPE "public"."enum_pages_blocks_lead_text_diagram" AS ENUM('none', 'merge', 'weave', 'cross');
  CREATE TYPE "public"."enum_pages_blocks_lead_text_closing_link_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_lead_text_closing_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum_pages_blocks_media_text_variant" AS ENUM('fade', 'card');
  CREATE TYPE "public"."enum_pages_blocks_media_text_link_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_media_text_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum_pages_blocks_media_text_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_pages_blocks_card_carousel_cards_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum_pages_blocks_card_carousel_card_style" AS ENUM('service', 'pillar');
  CREATE TYPE "public"."enum_pages_blocks_card_carousel_theme" AS ENUM('dark', 'light');
  CREATE TYPE "public"."enum_pages_blocks_stacked_panels_panels_link_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_stacked_panels_panels_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum_pages_blocks_case_study_gallery_link_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_case_study_gallery_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum_pages_blocks_case_study_grid_cta_link_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_case_study_grid_cta_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum_pages_blocks_group_scale_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum_pages_blocks_open_roles_footer_link_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_open_roles_footer_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum_pages_blocks_service_detail_links_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_service_detail_links_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum_pages_blocks_svc_list_items_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum_pages_blocks_statement_style" AS ENUM('centered', 'band');
  CREATE TYPE "public"."enum_pages_blocks_statement_animation" AS ENUM('scrollReveal', 'none');
  CREATE TYPE "public"."enum_pages_blocks_link_tiles_tiles_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum_pages_blocks_link_tiles_tile_style" AS ENUM('standard', 'tall', 'numbered');
  CREATE TYPE "public"."enum_pages_blocks_cta_banner_custom_link_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_cta_banner_custom_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum_pages_blocks_form_form_type" AS ENUM('enquiry', 'application', 'contact');
  CREATE TYPE "public"."enum_pages_blocks_form_aside_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum_pages_blocks_form_interest_note_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum_pages_blocks_offices_time_zone" AS ENUM('none', 'Asia/Dubai', 'Asia/Riyadh', 'Europe/London');
  CREATE TYPE "public"."enum_legal_cookie_category" AS ENUM('necessary', 'analytics', 'functional', 'marketing');
  CREATE TYPE "public"."enum_pages_blocks_legal_document_ask_link_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_legal_document_ask_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_links_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_links_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_variant" AS ENUM('page', 'showreel');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_headline_size" AS ENUM('wrap', 'oneLine', 'fitted');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_image_style" AS ENUM('dim', 'bright');
  CREATE TYPE "public"."enum__pages_v_blocks_section_nav_source" AS ENUM('sections', 'menu');
  CREATE TYPE "public"."enum__pages_v_blocks_section_nav_bar_style" AS ENUM('bar', 'sticky');
  CREATE TYPE "public"."enum__pages_v_blocks_lead_text_text_size" AS ENUM('lg', 'md', 'sm');
  CREATE TYPE "public"."enum__pages_v_blocks_lead_text_animation" AS ENUM('scrollReveal', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_lead_text_highlight_mode" AS ENUM('none', 'tail', 'words', 'phrase');
  CREATE TYPE "public"."enum__pages_v_blocks_lead_text_diagram" AS ENUM('none', 'merge', 'weave', 'cross');
  CREATE TYPE "public"."enum__pages_v_blocks_lead_text_closing_link_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_lead_text_closing_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum__pages_v_blocks_media_text_variant" AS ENUM('fade', 'card');
  CREATE TYPE "public"."enum__pages_v_blocks_media_text_link_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_media_text_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum__pages_v_blocks_media_text_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum__pages_v_blocks_card_carousel_cards_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum__pages_v_blocks_card_carousel_card_style" AS ENUM('service', 'pillar');
  CREATE TYPE "public"."enum__pages_v_blocks_card_carousel_theme" AS ENUM('dark', 'light');
  CREATE TYPE "public"."enum__pages_v_blocks_stacked_panels_panels_link_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_stacked_panels_panels_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum__pages_v_blocks_case_study_gallery_link_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_case_study_gallery_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum__pages_v_blocks_case_study_grid_cta_link_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_case_study_grid_cta_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum__pages_v_blocks_group_scale_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum__pages_v_blocks_open_roles_footer_link_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_open_roles_footer_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum__pages_v_blocks_service_detail_links_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_service_detail_links_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum__pages_v_blocks_svc_list_items_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum__pages_v_blocks_statement_style" AS ENUM('centered', 'band');
  CREATE TYPE "public"."enum__pages_v_blocks_statement_animation" AS ENUM('scrollReveal', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_link_tiles_tiles_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum__pages_v_blocks_link_tiles_tile_style" AS ENUM('standard', 'tall', 'numbered');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_banner_custom_link_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_banner_custom_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum__pages_v_blocks_form_form_type" AS ENUM('enquiry', 'application', 'contact');
  CREATE TYPE "public"."enum__pages_v_blocks_form_aside_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum__pages_v_blocks_form_interest_note_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum__pages_v_blocks_offices_time_zone" AS ENUM('none', 'Asia/Dubai', 'Asia/Riyadh', 'Europe/London');
  CREATE TYPE "public"."enum__pages_v_blocks_legal_document_ask_link_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_legal_document_ask_link_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_case_studies_services" AS ENUM('strategy', 'events', 'media', 'creative');
  CREATE TYPE "public"."enum_team_members_group" AS ENUM('management', 'creative', 'staff');
  CREATE TYPE "public"."enum_team_members_department" AS ENUM('top', 'commercial', 'delivery', 'operations');
  CREATE TYPE "public"."enum_roles_team" AS ENUM('commercial', 'delivery', 'creative', 'analytics');
  CREATE TYPE "public"."enum_roles_employment_type" AS ENUM('fullTime', 'partTime', 'contract', 'internship');
  CREATE TYPE "public"."enum_form_submissions_form" AS ENUM('enquiry', 'application');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_site_settings_header_links_sub_links_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum_site_settings_header_links_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum_site_settings_footer_links_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum_site_settings_legal_links_type" AS ENUM('page', 'section', 'url');
  CREATE TYPE "public"."enum_site_settings_social_platform" AS ENUM('instagram', 'linkedin', 'x', 'youtube', 'facebook', 'tiktok');
  CREATE TYPE "public"."enum_site_settings_cta_link_appearance" AS ENUM('primary', 'ghost', 'dark');
  CREATE TYPE "public"."enum_site_settings_cta_link_type" AS ENUM('page', 'section', 'url');
  CREATE TABLE "pages_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"appearance" "enum_pages_blocks_hero_links_appearance" DEFAULT 'primary',
  	"type" "enum_pages_blocks_hero_links_type" DEFAULT 'page',
  	"page_id" integer,
  	"section" varchar,
  	"url" varchar,
  	"new_tab" boolean
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_hero_variant" DEFAULT 'page',
  	"title" varchar,
  	"highlight_last_word" boolean DEFAULT true,
  	"larger_on_phones" boolean DEFAULT false,
  	"smaller_on_phones" boolean DEFAULT false,
  	"headline_size" "enum_pages_blocks_hero_headline_size" DEFAULT 'wrap',
  	"image_style" "enum_pages_blocks_hero_image_style" DEFAULT 'dim',
  	"lede" varchar,
  	"intro" jsonb,
  	"video_id" integer,
  	"video_mobile_id" integer,
  	"poster_id" integer,
  	"show_scroll_cue" boolean DEFAULT true,
  	"show_brand_mark" boolean DEFAULT false,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_section_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_pages_blocks_section_nav_source" DEFAULT 'sections',
  	"bar_style" "enum_pages_blocks_section_nav_bar_style" DEFAULT 'bar',
  	"note" varchar,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_lead_text_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_lead_text_merge_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"name" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_lead_text_weave_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"tag" varchar,
  	"text" varchar,
  	"image_id" integer
  );
  
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
  
  CREATE TABLE "pages_blocks_lead_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"text_size" "enum_pages_blocks_lead_text_text_size" DEFAULT 'lg',
  	"animation" "enum_pages_blocks_lead_text_animation" DEFAULT 'scrollReveal',
  	"band" boolean DEFAULT false,
  	"highlight_mode" "enum_pages_blocks_lead_text_highlight_mode" DEFAULT 'tail',
  	"highlight" varchar,
  	"diagram" "enum_pages_blocks_lead_text_diagram" DEFAULT 'none',
  	"weave_start_label" varchar DEFAULT 'Previously separate',
  	"weave_end_label" varchar DEFAULT 'Now one business',
  	"weave_result" varchar DEFAULT 'PLG Acachet',
  	"weave_note" varchar,
  	"show_details" boolean DEFAULT false,
  	"details_heading" varchar,
  	"details_text" varchar,
  	"show_closing" boolean DEFAULT false,
  	"closing_text" varchar,
  	"closing_link_label" varchar,
  	"closing_link_appearance" "enum_pages_blocks_lead_text_closing_link_appearance" DEFAULT 'primary',
  	"closing_link_type" "enum_pages_blocks_lead_text_closing_link_type" DEFAULT 'page',
  	"closing_link_page_id" integer,
  	"closing_link_section" varchar,
  	"closing_link_url" varchar,
  	"closing_link_new_tab" boolean,
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
  
  CREATE TABLE "pages_blocks_media_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_media_text_variant" DEFAULT 'fade',
  	"eyebrow" varchar,
  	"title" varchar,
  	"gradient_title" boolean DEFAULT true,
  	"body" jsonb,
  	"list_heading" varchar,
  	"show_button" boolean DEFAULT true,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_media_text_link_appearance" DEFAULT 'primary',
  	"link_type" "enum_pages_blocks_media_text_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_section" varchar,
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"image_id" integer,
  	"image_position" "enum_pages_blocks_media_text_image_position" DEFAULT 'right',
  	"fade_image_edge" boolean DEFAULT true,
  	"report_title" varchar,
  	"report_badge" varchar DEFAULT 'Live',
  	"report_caption" varchar,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_card_carousel_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"tag" varchar,
  	"text" varchar,
  	"image_id" integer,
  	"has_link" boolean DEFAULT true,
  	"link_label" varchar,
  	"link_type" "enum_pages_blocks_card_carousel_cards_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_section" varchar,
  	"link_url" varchar,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "pages_blocks_card_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"card_style" "enum_pages_blocks_card_carousel_card_style" DEFAULT 'service',
  	"note" varchar,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"theme" "enum_pages_blocks_card_carousel_theme" DEFAULT 'light',
  	"hide_section" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stacked_panels_panels" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"gradient_title" boolean DEFAULT true,
  	"text" varchar,
  	"image_id" integer,
  	"show_button" boolean DEFAULT true,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_stacked_panels_panels_link_appearance" DEFAULT 'primary',
  	"link_type" "enum_pages_blocks_stacked_panels_panels_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_section" varchar,
  	"link_url" varchar,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "pages_blocks_stacked_panels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"block_name" varchar
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
  
  CREATE TABLE "pages_blocks_stats_carousel_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric,
  	"suffix" varchar,
  	"label" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_stats_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"autoplay_seconds" numeric DEFAULT 4.5,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_case_study_gallery_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"case_study_id" integer,
  	"full_width" boolean,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_case_study_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"show_button" boolean DEFAULT true,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_case_study_gallery_link_appearance" DEFAULT 'primary',
  	"link_type" "enum_pages_blocks_case_study_gallery_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_section" varchar,
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"block_name" varchar
  );
  
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
  
  CREATE TABLE "pages_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"style" "enum_pages_blocks_statement_style" DEFAULT 'centered',
  	"highlight" varchar,
  	"animation" "enum_pages_blocks_statement_animation" DEFAULT 'scrollReveal',
  	"show_brand_marks" boolean DEFAULT true,
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
  	"gradient_title" boolean DEFAULT false,
  	"tile_style" "enum_pages_blocks_link_tiles_tile_style" DEFAULT 'standard',
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
  
  CREATE TABLE "pages_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_type" "enum_pages_blocks_form_form_type" DEFAULT 'enquiry',
  	"eyebrow" varchar,
  	"title" varchar,
  	"lede" varchar,
  	"background_image_id" integer,
  	"submit_label" varchar DEFAULT 'Talk to Us',
  	"success_message" varchar DEFAULT 'Thanks — we’ll be in touch shortly.',
  	"aside_text" varchar,
  	"aside_link_label" varchar,
  	"aside_link_type" "enum_pages_blocks_form_aside_link_type" DEFAULT 'page',
  	"aside_link_page_id" integer,
  	"aside_link_section" varchar,
  	"aside_link_url" varchar,
  	"aside_link_new_tab" boolean,
  	"interests_label" varchar DEFAULT 'What are you looking to unlock?',
  	"interests_hint" varchar DEFAULT 'Choose any that apply',
  	"interest_note" varchar,
  	"interest_note_link_label" varchar,
  	"interest_note_link_type" "enum_pages_blocks_form_interest_note_link_type" DEFAULT 'page',
  	"interest_note_link_page_id" integer,
  	"interest_note_link_section" varchar,
  	"interest_note_link_url" varchar,
  	"interest_note_link_new_tab" boolean,
  	"message_label" varchar DEFAULT 'Tell us about the ambition',
  	"message_placeholder" varchar,
  	"consent_text" varchar DEFAULT 'I agree to PLG Acachet using my details to respond to this enquiry.',
  	"success_title" varchar DEFAULT 'Thank you. We’ll be in touch within two business days.',
  	"note" varchar,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"block_name" varchar
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
  
  CREATE TABLE "pages_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"slug" varchar,
  	"path" varchar,
  	"forward_to_id" integer,
  	"parent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"partners_id" integer,
  	"team_members_id" integer,
  	"roles_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"appearance" "enum__pages_v_blocks_hero_links_appearance" DEFAULT 'primary',
  	"type" "enum__pages_v_blocks_hero_links_type" DEFAULT 'page',
  	"page_id" integer,
  	"section" varchar,
  	"url" varchar,
  	"new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_hero_variant" DEFAULT 'page',
  	"title" varchar,
  	"highlight_last_word" boolean DEFAULT true,
  	"larger_on_phones" boolean DEFAULT false,
  	"smaller_on_phones" boolean DEFAULT false,
  	"headline_size" "enum__pages_v_blocks_hero_headline_size" DEFAULT 'wrap',
  	"image_style" "enum__pages_v_blocks_hero_image_style" DEFAULT 'dim',
  	"lede" varchar,
  	"intro" jsonb,
  	"video_id" integer,
  	"video_mobile_id" integer,
  	"poster_id" integer,
  	"show_scroll_cue" boolean DEFAULT true,
  	"show_brand_mark" boolean DEFAULT false,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_section_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"source" "enum__pages_v_blocks_section_nav_source" DEFAULT 'sections',
  	"bar_style" "enum__pages_v_blocks_section_nav_bar_style" DEFAULT 'bar',
  	"note" varchar,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lead_text_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
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
  
  CREATE TABLE "_pages_v_blocks_lead_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"text_size" "enum__pages_v_blocks_lead_text_text_size" DEFAULT 'lg',
  	"animation" "enum__pages_v_blocks_lead_text_animation" DEFAULT 'scrollReveal',
  	"band" boolean DEFAULT false,
  	"highlight_mode" "enum__pages_v_blocks_lead_text_highlight_mode" DEFAULT 'tail',
  	"highlight" varchar,
  	"diagram" "enum__pages_v_blocks_lead_text_diagram" DEFAULT 'none',
  	"weave_start_label" varchar DEFAULT 'Previously separate',
  	"weave_end_label" varchar DEFAULT 'Now one business',
  	"weave_result" varchar DEFAULT 'PLG Acachet',
  	"weave_note" varchar,
  	"show_details" boolean DEFAULT false,
  	"details_heading" varchar,
  	"details_text" varchar,
  	"show_closing" boolean DEFAULT false,
  	"closing_text" varchar,
  	"closing_link_label" varchar,
  	"closing_link_appearance" "enum__pages_v_blocks_lead_text_closing_link_appearance" DEFAULT 'primary',
  	"closing_link_type" "enum__pages_v_blocks_lead_text_closing_link_type" DEFAULT 'page',
  	"closing_link_page_id" integer,
  	"closing_link_section" varchar,
  	"closing_link_url" varchar,
  	"closing_link_new_tab" boolean,
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
  
  CREATE TABLE "_pages_v_blocks_media_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_media_text_variant" DEFAULT 'fade',
  	"eyebrow" varchar,
  	"title" varchar,
  	"gradient_title" boolean DEFAULT true,
  	"body" jsonb,
  	"list_heading" varchar,
  	"show_button" boolean DEFAULT true,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_media_text_link_appearance" DEFAULT 'primary',
  	"link_type" "enum__pages_v_blocks_media_text_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_section" varchar,
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"image_id" integer,
  	"image_position" "enum__pages_v_blocks_media_text_image_position" DEFAULT 'right',
  	"fade_image_edge" boolean DEFAULT true,
  	"report_title" varchar,
  	"report_badge" varchar DEFAULT 'Live',
  	"report_caption" varchar,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_carousel_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"tag" varchar,
  	"text" varchar,
  	"image_id" integer,
  	"has_link" boolean DEFAULT true,
  	"link_label" varchar,
  	"link_type" "enum__pages_v_blocks_card_carousel_cards_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_section" varchar,
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"card_style" "enum__pages_v_blocks_card_carousel_card_style" DEFAULT 'service',
  	"note" varchar,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"theme" "enum__pages_v_blocks_card_carousel_theme" DEFAULT 'light',
  	"hide_section" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stacked_panels_panels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"gradient_title" boolean DEFAULT true,
  	"text" varchar,
  	"image_id" integer,
  	"show_button" boolean DEFAULT true,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_stacked_panels_panels_link_appearance" DEFAULT 'primary',
  	"link_type" "enum__pages_v_blocks_stacked_panels_panels_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_section" varchar,
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stacked_panels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
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
  
  CREATE TABLE "_pages_v_blocks_stats_carousel_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" numeric,
  	"suffix" varchar,
  	"label" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"autoplay_seconds" numeric DEFAULT 4.5,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_case_study_gallery_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"case_study_id" integer,
  	"full_width" boolean,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_case_study_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"show_button" boolean DEFAULT true,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_case_study_gallery_link_appearance" DEFAULT 'primary',
  	"link_type" "enum__pages_v_blocks_case_study_gallery_link_type" DEFAULT 'page',
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
  
  CREATE TABLE "_pages_v_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"style" "enum__pages_v_blocks_statement_style" DEFAULT 'centered',
  	"highlight" varchar,
  	"animation" "enum__pages_v_blocks_statement_animation" DEFAULT 'scrollReveal',
  	"show_brand_marks" boolean DEFAULT true,
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
  	"gradient_title" boolean DEFAULT false,
  	"tile_style" "enum__pages_v_blocks_link_tiles_tile_style" DEFAULT 'standard',
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
  
  CREATE TABLE "_pages_v_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_type" "enum__pages_v_blocks_form_form_type" DEFAULT 'enquiry',
  	"eyebrow" varchar,
  	"title" varchar,
  	"lede" varchar,
  	"background_image_id" integer,
  	"submit_label" varchar DEFAULT 'Talk to Us',
  	"success_message" varchar DEFAULT 'Thanks — we’ll be in touch shortly.',
  	"aside_text" varchar,
  	"aside_link_label" varchar,
  	"aside_link_type" "enum__pages_v_blocks_form_aside_link_type" DEFAULT 'page',
  	"aside_link_page_id" integer,
  	"aside_link_section" varchar,
  	"aside_link_url" varchar,
  	"aside_link_new_tab" boolean,
  	"interests_label" varchar DEFAULT 'What are you looking to unlock?',
  	"interests_hint" varchar DEFAULT 'Choose any that apply',
  	"interest_note" varchar,
  	"interest_note_link_label" varchar,
  	"interest_note_link_type" "enum__pages_v_blocks_form_interest_note_link_type" DEFAULT 'page',
  	"interest_note_link_page_id" integer,
  	"interest_note_link_section" varchar,
  	"interest_note_link_url" varchar,
  	"interest_note_link_new_tab" boolean,
  	"message_label" varchar DEFAULT 'Tell us about the ambition',
  	"message_placeholder" varchar,
  	"consent_text" varchar DEFAULT 'I agree to PLG Acachet using my details to respond to this enquiry.',
  	"success_title" varchar DEFAULT 'Thank you. We’ll be in touch within two business days.',
  	"note" varchar,
  	"anchor_id" varchar,
  	"nav_label" varchar,
  	"hide_section" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
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
  
  CREATE TABLE "_pages_v_version_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_slug" varchar,
  	"version_path" varchar,
  	"version_forward_to_id" integer,
  	"version_parent_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"partners_id" integer,
  	"team_members_id" integer,
  	"roles_id" integer,
  	"pages_id" integer
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
  
  CREATE TABLE "case_studies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"card_title" varchar,
  	"summary" varchar NOT NULL,
  	"client" varchar,
  	"image_id" integer NOT NULL,
  	"video_id" integer,
  	"wide" boolean DEFAULT false,
  	"key_visual_pending" boolean DEFAULT false,
  	"market" varchar,
  	"year" varchar,
  	"brief" varchar,
  	"approach" varchar,
  	"still_id" integer,
  	"still_caption" varchar DEFAULT 'On the ground',
  	"film_id" integer,
  	"film_caption" varchar DEFAULT 'Programme film',
  	"meta_description" varchar,
  	"slug" varchar,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "partners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer NOT NULL,
  	"height" numeric DEFAULT 40,
  	"mobile_height" numeric,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
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
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"prefix" varchar DEFAULT 'media',
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form" "enum_form_submissions_form" NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"company" varchar,
  	"consent" boolean,
  	"interests" varchar,
  	"role" varchar,
  	"discipline" varchar,
  	"profile_link" varchar,
  	"message" varchar,
  	"page" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"case_studies_id" integer,
  	"partners_id" integer,
  	"team_members_id" integer,
  	"roles_id" integer,
  	"media_id" integer,
  	"form_submissions_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
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
  
  CREATE TABLE "site_settings_header_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_site_settings_header_links_type" DEFAULT 'page',
  	"page_id" integer,
  	"section" varchar,
  	"url" varchar,
  	"new_tab" boolean
  );
  
  CREATE TABLE "site_settings_footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_site_settings_footer_links_type" DEFAULT 'page',
  	"page_id" integer,
  	"section" varchar,
  	"url" varchar,
  	"new_tab" boolean
  );
  
  CREATE TABLE "site_settings_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_site_settings_legal_links_type" DEFAULT 'page',
  	"page_id" integer,
  	"section" varchar,
  	"url" varchar,
  	"new_tab" boolean
  );
  
  CREATE TABLE "site_settings_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_social_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"mobile_menu_note" varchar DEFAULT '© 2026 PLG Acachet',
  	"cta_eyebrow" varchar,
  	"cta_title" varchar,
  	"cta_lede" varchar,
  	"cta_link_label" varchar,
  	"cta_link_appearance" "enum_site_settings_cta_link_appearance" DEFAULT 'primary',
  	"cta_link_type" "enum_site_settings_cta_link_type" DEFAULT 'page',
  	"cta_link_page_id" integer,
  	"cta_link_section" varchar,
  	"cta_link_url" varchar,
  	"cta_link_new_tab" boolean,
  	"cta_image_id" integer,
  	"company_name" varchar DEFAULT 'PLG Acachet',
  	"company_email" varchar,
  	"company_address" varchar,
  	"company_phone" varchar,
  	"copyright" varchar DEFAULT '© 2026 PLG Acachet. All rights reserved.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_blocks_hero_links" ADD CONSTRAINT "pages_blocks_hero_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_links" ADD CONSTRAINT "pages_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_video_mobile_id_media_id_fk" FOREIGN KEY ("video_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_section_nav" ADD CONSTRAINT "pages_blocks_section_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lead_text_notes" ADD CONSTRAINT "pages_blocks_lead_text_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lead_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lead_text_merge_items" ADD CONSTRAINT "pages_blocks_lead_text_merge_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lead_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lead_text_weave_items" ADD CONSTRAINT "pages_blocks_lead_text_weave_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_lead_text_weave_items" ADD CONSTRAINT "pages_blocks_lead_text_weave_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lead_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lead_text_cross_items" ADD CONSTRAINT "pages_blocks_lead_text_cross_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lead_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lead_text_details_list" ADD CONSTRAINT "pages_blocks_lead_text_details_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lead_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lead_text" ADD CONSTRAINT "pages_blocks_lead_text_closing_link_page_id_pages_id_fk" FOREIGN KEY ("closing_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_lead_text" ADD CONSTRAINT "pages_blocks_lead_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_text_list_items" ADD CONSTRAINT "pages_blocks_media_text_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_media_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_text_report_bars" ADD CONSTRAINT "pages_blocks_media_text_report_bars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_media_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_text" ADD CONSTRAINT "pages_blocks_media_text_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_text" ADD CONSTRAINT "pages_blocks_media_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_text" ADD CONSTRAINT "pages_blocks_media_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_carousel_cards" ADD CONSTRAINT "pages_blocks_card_carousel_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_carousel_cards" ADD CONSTRAINT "pages_blocks_card_carousel_cards_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_carousel_cards" ADD CONSTRAINT "pages_blocks_card_carousel_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_carousel" ADD CONSTRAINT "pages_blocks_card_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stacked_panels_panels" ADD CONSTRAINT "pages_blocks_stacked_panels_panels_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_stacked_panels_panels" ADD CONSTRAINT "pages_blocks_stacked_panels_panels_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_stacked_panels_panels" ADD CONSTRAINT "pages_blocks_stacked_panels_panels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stacked_panels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stacked_panels" ADD CONSTRAINT "pages_blocks_stacked_panels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_statements_items" ADD CONSTRAINT "pages_blocks_statements_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_statements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_statements" ADD CONSTRAINT "pages_blocks_statements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_background_text_ticker" ADD CONSTRAINT "pages_blocks_background_text_ticker_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_background_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_background_text" ADD CONSTRAINT "pages_blocks_background_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_background_text" ADD CONSTRAINT "pages_blocks_background_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_carousel_stats" ADD CONSTRAINT "pages_blocks_stats_carousel_stats_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_carousel_stats" ADD CONSTRAINT "pages_blocks_stats_carousel_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_carousel" ADD CONSTRAINT "pages_blocks_stats_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_marquee" ADD CONSTRAINT "pages_blocks_logo_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_case_study_gallery_items" ADD CONSTRAINT "pages_blocks_case_study_gallery_items_case_study_id_case_studies_id_fk" FOREIGN KEY ("case_study_id") REFERENCES "public"."case_studies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_case_study_gallery_items" ADD CONSTRAINT "pages_blocks_case_study_gallery_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_case_study_gallery_items" ADD CONSTRAINT "pages_blocks_case_study_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_case_study_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_case_study_gallery" ADD CONSTRAINT "pages_blocks_case_study_gallery_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_case_study_gallery" ADD CONSTRAINT "pages_blocks_case_study_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_case_study_grid" ADD CONSTRAINT "pages_blocks_case_study_grid_cta_link_page_id_pages_id_fk" FOREIGN KEY ("cta_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_case_study_grid" ADD CONSTRAINT "pages_blocks_case_study_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ownership_facts" ADD CONSTRAINT "pages_blocks_ownership_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ownership"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ownership_levels" ADD CONSTRAINT "pages_blocks_ownership_levels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ownership"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ownership" ADD CONSTRAINT "pages_blocks_ownership_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_directory" ADD CONSTRAINT "pages_blocks_team_directory_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_group_scale_chain" ADD CONSTRAINT "pages_blocks_group_scale_chain_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_group_scale"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_group_scale" ADD CONSTRAINT "pages_blocks_group_scale_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_group_scale" ADD CONSTRAINT "pages_blocks_group_scale_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_open_roles" ADD CONSTRAINT "pages_blocks_open_roles_footer_link_page_id_pages_id_fk" FOREIGN KEY ("footer_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_open_roles" ADD CONSTRAINT "pages_blocks_open_roles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "pages_blocks_statement" ADD CONSTRAINT "pages_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_link_tiles_tiles" ADD CONSTRAINT "pages_blocks_link_tiles_tiles_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_link_tiles_tiles" ADD CONSTRAINT "pages_blocks_link_tiles_tiles_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_link_tiles_tiles" ADD CONSTRAINT "pages_blocks_link_tiles_tiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_link_tiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_link_tiles" ADD CONSTRAINT "pages_blocks_link_tiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_banner" ADD CONSTRAINT "pages_blocks_cta_banner_custom_link_page_id_pages_id_fk" FOREIGN KEY ("custom_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_banner" ADD CONSTRAINT "pages_blocks_cta_banner_custom_image_id_media_id_fk" FOREIGN KEY ("custom_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_banner" ADD CONSTRAINT "pages_blocks_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_promises" ADD CONSTRAINT "pages_blocks_form_promises_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_interests" ADD CONSTRAINT "pages_blocks_form_interests_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_form" ADD CONSTRAINT "pages_blocks_form_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_form" ADD CONSTRAINT "pages_blocks_form_aside_link_page_id_pages_id_fk" FOREIGN KEY ("aside_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_form" ADD CONSTRAINT "pages_blocks_form_interest_note_link_page_id_pages_id_fk" FOREIGN KEY ("interest_note_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_form" ADD CONSTRAINT "pages_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_offices" ADD CONSTRAINT "pages_blocks_offices_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_offices" ADD CONSTRAINT "pages_blocks_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_document_facts" ADD CONSTRAINT "pages_blocks_legal_document_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_document"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_document_notice_points" ADD CONSTRAINT "pages_blocks_legal_document_notice_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_document"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "legal_cookies" ADD CONSTRAINT "legal_cookies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_document_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_document_sections" ADD CONSTRAINT "pages_blocks_legal_document_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_document"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_document" ADD CONSTRAINT "pages_blocks_legal_document_ask_link_page_id_pages_id_fk" FOREIGN KEY ("ask_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_document" ADD CONSTRAINT "pages_blocks_legal_document_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_breadcrumbs" ADD CONSTRAINT "pages_breadcrumbs_doc_id_pages_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_breadcrumbs" ADD CONSTRAINT "pages_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_forward_to_id_pages_id_fk" FOREIGN KEY ("forward_to_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_roles_fk" FOREIGN KEY ("roles_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_links" ADD CONSTRAINT "_pages_v_blocks_hero_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_links" ADD CONSTRAINT "_pages_v_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_video_mobile_id_media_id_fk" FOREIGN KEY ("video_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_section_nav" ADD CONSTRAINT "_pages_v_blocks_section_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lead_text_notes" ADD CONSTRAINT "_pages_v_blocks_lead_text_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lead_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lead_text_merge_items" ADD CONSTRAINT "_pages_v_blocks_lead_text_merge_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lead_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lead_text_weave_items" ADD CONSTRAINT "_pages_v_blocks_lead_text_weave_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lead_text_weave_items" ADD CONSTRAINT "_pages_v_blocks_lead_text_weave_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lead_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lead_text_cross_items" ADD CONSTRAINT "_pages_v_blocks_lead_text_cross_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lead_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lead_text_details_list" ADD CONSTRAINT "_pages_v_blocks_lead_text_details_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lead_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lead_text" ADD CONSTRAINT "_pages_v_blocks_lead_text_closing_link_page_id_pages_id_fk" FOREIGN KEY ("closing_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lead_text" ADD CONSTRAINT "_pages_v_blocks_lead_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_text_list_items" ADD CONSTRAINT "_pages_v_blocks_media_text_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_media_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_text_report_bars" ADD CONSTRAINT "_pages_v_blocks_media_text_report_bars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_media_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_text" ADD CONSTRAINT "_pages_v_blocks_media_text_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_text" ADD CONSTRAINT "_pages_v_blocks_media_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_text" ADD CONSTRAINT "_pages_v_blocks_media_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_carousel_cards" ADD CONSTRAINT "_pages_v_blocks_card_carousel_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_carousel_cards" ADD CONSTRAINT "_pages_v_blocks_card_carousel_cards_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_carousel_cards" ADD CONSTRAINT "_pages_v_blocks_card_carousel_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_carousel" ADD CONSTRAINT "_pages_v_blocks_card_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stacked_panels_panels" ADD CONSTRAINT "_pages_v_blocks_stacked_panels_panels_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stacked_panels_panels" ADD CONSTRAINT "_pages_v_blocks_stacked_panels_panels_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stacked_panels_panels" ADD CONSTRAINT "_pages_v_blocks_stacked_panels_panels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stacked_panels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stacked_panels" ADD CONSTRAINT "_pages_v_blocks_stacked_panels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_statements_items" ADD CONSTRAINT "_pages_v_blocks_statements_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_statements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_statements" ADD CONSTRAINT "_pages_v_blocks_statements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_background_text_ticker" ADD CONSTRAINT "_pages_v_blocks_background_text_ticker_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_background_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_background_text" ADD CONSTRAINT "_pages_v_blocks_background_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_background_text" ADD CONSTRAINT "_pages_v_blocks_background_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_carousel_stats" ADD CONSTRAINT "_pages_v_blocks_stats_carousel_stats_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_carousel_stats" ADD CONSTRAINT "_pages_v_blocks_stats_carousel_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_carousel" ADD CONSTRAINT "_pages_v_blocks_stats_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_marquee" ADD CONSTRAINT "_pages_v_blocks_logo_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_case_study_gallery_items" ADD CONSTRAINT "_pages_v_blocks_case_study_gallery_items_case_study_id_case_studies_id_fk" FOREIGN KEY ("case_study_id") REFERENCES "public"."case_studies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_case_study_gallery_items" ADD CONSTRAINT "_pages_v_blocks_case_study_gallery_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_case_study_gallery_items" ADD CONSTRAINT "_pages_v_blocks_case_study_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_case_study_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_case_study_gallery" ADD CONSTRAINT "_pages_v_blocks_case_study_gallery_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_case_study_gallery" ADD CONSTRAINT "_pages_v_blocks_case_study_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_case_study_grid" ADD CONSTRAINT "_pages_v_blocks_case_study_grid_cta_link_page_id_pages_id_fk" FOREIGN KEY ("cta_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_case_study_grid" ADD CONSTRAINT "_pages_v_blocks_case_study_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ownership_facts" ADD CONSTRAINT "_pages_v_blocks_ownership_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ownership"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ownership_levels" ADD CONSTRAINT "_pages_v_blocks_ownership_levels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ownership"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ownership" ADD CONSTRAINT "_pages_v_blocks_ownership_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_directory" ADD CONSTRAINT "_pages_v_blocks_team_directory_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_group_scale_chain" ADD CONSTRAINT "_pages_v_blocks_group_scale_chain_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_group_scale"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_group_scale" ADD CONSTRAINT "_pages_v_blocks_group_scale_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_group_scale" ADD CONSTRAINT "_pages_v_blocks_group_scale_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_open_roles" ADD CONSTRAINT "_pages_v_blocks_open_roles_footer_link_page_id_pages_id_fk" FOREIGN KEY ("footer_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_open_roles" ADD CONSTRAINT "_pages_v_blocks_open_roles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "_pages_v_blocks_statement" ADD CONSTRAINT "_pages_v_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_link_tiles_tiles" ADD CONSTRAINT "_pages_v_blocks_link_tiles_tiles_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_link_tiles_tiles" ADD CONSTRAINT "_pages_v_blocks_link_tiles_tiles_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_link_tiles_tiles" ADD CONSTRAINT "_pages_v_blocks_link_tiles_tiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_link_tiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_link_tiles" ADD CONSTRAINT "_pages_v_blocks_link_tiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_banner" ADD CONSTRAINT "_pages_v_blocks_cta_banner_custom_link_page_id_pages_id_fk" FOREIGN KEY ("custom_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_banner" ADD CONSTRAINT "_pages_v_blocks_cta_banner_custom_image_id_media_id_fk" FOREIGN KEY ("custom_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_banner" ADD CONSTRAINT "_pages_v_blocks_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_promises" ADD CONSTRAINT "_pages_v_blocks_form_promises_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_interests" ADD CONSTRAINT "_pages_v_blocks_form_interests_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form" ADD CONSTRAINT "_pages_v_blocks_form_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form" ADD CONSTRAINT "_pages_v_blocks_form_aside_link_page_id_pages_id_fk" FOREIGN KEY ("aside_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form" ADD CONSTRAINT "_pages_v_blocks_form_interest_note_link_page_id_pages_id_fk" FOREIGN KEY ("interest_note_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form" ADD CONSTRAINT "_pages_v_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_offices" ADD CONSTRAINT "_pages_v_blocks_offices_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_offices" ADD CONSTRAINT "_pages_v_blocks_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_document_facts" ADD CONSTRAINT "_pages_v_blocks_legal_document_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_document"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_document_notice_points" ADD CONSTRAINT "_pages_v_blocks_legal_document_notice_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_document"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_legal_cookies_v" ADD CONSTRAINT "_legal_cookies_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_document_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_document_sections" ADD CONSTRAINT "_pages_v_blocks_legal_document_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_document"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_document" ADD CONSTRAINT "_pages_v_blocks_legal_document_ask_link_page_id_pages_id_fk" FOREIGN KEY ("ask_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_document" ADD CONSTRAINT "_pages_v_blocks_legal_document_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_breadcrumbs" ADD CONSTRAINT "_pages_v_version_breadcrumbs_doc_id_pages_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_breadcrumbs" ADD CONSTRAINT "_pages_v_version_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_forward_to_id_pages_id_fk" FOREIGN KEY ("version_forward_to_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_parent_id_pages_id_fk" FOREIGN KEY ("version_parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_roles_fk" FOREIGN KEY ("roles_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_services" ADD CONSTRAINT "case_studies_services_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_results" ADD CONSTRAINT "case_studies_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_points" ADD CONSTRAINT "case_studies_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_gallery" ADD CONSTRAINT "case_studies_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies_gallery" ADD CONSTRAINT "case_studies_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_still_id_media_id_fk" FOREIGN KEY ("still_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_film_id_media_id_fk" FOREIGN KEY ("film_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "partners" ADD CONSTRAINT "partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "roles_points" ADD CONSTRAINT "roles_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_roles_fk" FOREIGN KEY ("roles_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_header_links_sub_links" ADD CONSTRAINT "site_settings_header_links_sub_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_header_links_sub_links" ADD CONSTRAINT "site_settings_header_links_sub_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_header_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_header_links" ADD CONSTRAINT "site_settings_header_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_header_links" ADD CONSTRAINT "site_settings_header_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_links" ADD CONSTRAINT "site_settings_footer_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_footer_links" ADD CONSTRAINT "site_settings_footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_legal_links" ADD CONSTRAINT "site_settings_legal_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_legal_links" ADD CONSTRAINT "site_settings_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social" ADD CONSTRAINT "site_settings_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_cta_link_page_id_pages_id_fk" FOREIGN KEY ("cta_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_cta_image_id_media_id_fk" FOREIGN KEY ("cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_links_order_idx" ON "pages_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_links_parent_id_idx" ON "pages_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_links_page_idx" ON "pages_blocks_hero_links" USING btree ("page_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_video_idx" ON "pages_blocks_hero" USING btree ("video_id");
  CREATE INDEX "pages_blocks_hero_video_mobile_idx" ON "pages_blocks_hero" USING btree ("video_mobile_id");
  CREATE INDEX "pages_blocks_hero_poster_idx" ON "pages_blocks_hero" USING btree ("poster_id");
  CREATE INDEX "pages_blocks_section_nav_order_idx" ON "pages_blocks_section_nav" USING btree ("_order");
  CREATE INDEX "pages_blocks_section_nav_parent_id_idx" ON "pages_blocks_section_nav" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_section_nav_path_idx" ON "pages_blocks_section_nav" USING btree ("_path");
  CREATE INDEX "pages_blocks_lead_text_notes_order_idx" ON "pages_blocks_lead_text_notes" USING btree ("_order");
  CREATE INDEX "pages_blocks_lead_text_notes_parent_id_idx" ON "pages_blocks_lead_text_notes" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lead_text_merge_items_order_idx" ON "pages_blocks_lead_text_merge_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_lead_text_merge_items_parent_id_idx" ON "pages_blocks_lead_text_merge_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lead_text_weave_items_order_idx" ON "pages_blocks_lead_text_weave_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_lead_text_weave_items_parent_id_idx" ON "pages_blocks_lead_text_weave_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lead_text_weave_items_image_idx" ON "pages_blocks_lead_text_weave_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_lead_text_cross_items_order_idx" ON "pages_blocks_lead_text_cross_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_lead_text_cross_items_parent_id_idx" ON "pages_blocks_lead_text_cross_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lead_text_details_list_order_idx" ON "pages_blocks_lead_text_details_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_lead_text_details_list_parent_id_idx" ON "pages_blocks_lead_text_details_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lead_text_order_idx" ON "pages_blocks_lead_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_lead_text_parent_id_idx" ON "pages_blocks_lead_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lead_text_path_idx" ON "pages_blocks_lead_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_lead_text_closing_link_closing_link_page_idx" ON "pages_blocks_lead_text" USING btree ("closing_link_page_id");
  CREATE INDEX "pages_blocks_media_text_list_items_order_idx" ON "pages_blocks_media_text_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_text_list_items_parent_id_idx" ON "pages_blocks_media_text_list_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_text_report_bars_order_idx" ON "pages_blocks_media_text_report_bars" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_text_report_bars_parent_id_idx" ON "pages_blocks_media_text_report_bars" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_text_order_idx" ON "pages_blocks_media_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_text_parent_id_idx" ON "pages_blocks_media_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_text_path_idx" ON "pages_blocks_media_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_text_link_link_page_idx" ON "pages_blocks_media_text" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_media_text_image_idx" ON "pages_blocks_media_text" USING btree ("image_id");
  CREATE INDEX "pages_blocks_card_carousel_cards_order_idx" ON "pages_blocks_card_carousel_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_carousel_cards_parent_id_idx" ON "pages_blocks_card_carousel_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_carousel_cards_image_idx" ON "pages_blocks_card_carousel_cards" USING btree ("image_id");
  CREATE INDEX "pages_blocks_card_carousel_cards_link_link_page_idx" ON "pages_blocks_card_carousel_cards" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_card_carousel_order_idx" ON "pages_blocks_card_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_carousel_parent_id_idx" ON "pages_blocks_card_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_carousel_path_idx" ON "pages_blocks_card_carousel" USING btree ("_path");
  CREATE INDEX "pages_blocks_stacked_panels_panels_order_idx" ON "pages_blocks_stacked_panels_panels" USING btree ("_order");
  CREATE INDEX "pages_blocks_stacked_panels_panels_parent_id_idx" ON "pages_blocks_stacked_panels_panels" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stacked_panels_panels_image_idx" ON "pages_blocks_stacked_panels_panels" USING btree ("image_id");
  CREATE INDEX "pages_blocks_stacked_panels_panels_link_link_page_idx" ON "pages_blocks_stacked_panels_panels" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_stacked_panels_order_idx" ON "pages_blocks_stacked_panels" USING btree ("_order");
  CREATE INDEX "pages_blocks_stacked_panels_parent_id_idx" ON "pages_blocks_stacked_panels" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stacked_panels_path_idx" ON "pages_blocks_stacked_panels" USING btree ("_path");
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
  CREATE INDEX "pages_blocks_stats_carousel_stats_order_idx" ON "pages_blocks_stats_carousel_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_carousel_stats_parent_id_idx" ON "pages_blocks_stats_carousel_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_carousel_stats_image_idx" ON "pages_blocks_stats_carousel_stats" USING btree ("image_id");
  CREATE INDEX "pages_blocks_stats_carousel_order_idx" ON "pages_blocks_stats_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_carousel_parent_id_idx" ON "pages_blocks_stats_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_carousel_path_idx" ON "pages_blocks_stats_carousel" USING btree ("_path");
  CREATE INDEX "pages_blocks_logo_marquee_order_idx" ON "pages_blocks_logo_marquee" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_marquee_parent_id_idx" ON "pages_blocks_logo_marquee" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_marquee_path_idx" ON "pages_blocks_logo_marquee" USING btree ("_path");
  CREATE INDEX "pages_blocks_case_study_gallery_items_order_idx" ON "pages_blocks_case_study_gallery_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_case_study_gallery_items_parent_id_idx" ON "pages_blocks_case_study_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_case_study_gallery_items_case_study_idx" ON "pages_blocks_case_study_gallery_items" USING btree ("case_study_id");
  CREATE INDEX "pages_blocks_case_study_gallery_items_image_idx" ON "pages_blocks_case_study_gallery_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_case_study_gallery_order_idx" ON "pages_blocks_case_study_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_case_study_gallery_parent_id_idx" ON "pages_blocks_case_study_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_case_study_gallery_path_idx" ON "pages_blocks_case_study_gallery" USING btree ("_path");
  CREATE INDEX "pages_blocks_case_study_gallery_link_link_page_idx" ON "pages_blocks_case_study_gallery" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_case_study_grid_order_idx" ON "pages_blocks_case_study_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_case_study_grid_parent_id_idx" ON "pages_blocks_case_study_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_case_study_grid_path_idx" ON "pages_blocks_case_study_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_case_study_grid_cta_link_cta_link_page_idx" ON "pages_blocks_case_study_grid" USING btree ("cta_link_page_id");
  CREATE INDEX "pages_blocks_ownership_facts_order_idx" ON "pages_blocks_ownership_facts" USING btree ("_order");
  CREATE INDEX "pages_blocks_ownership_facts_parent_id_idx" ON "pages_blocks_ownership_facts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ownership_levels_order_idx" ON "pages_blocks_ownership_levels" USING btree ("_order");
  CREATE INDEX "pages_blocks_ownership_levels_parent_id_idx" ON "pages_blocks_ownership_levels" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ownership_order_idx" ON "pages_blocks_ownership" USING btree ("_order");
  CREATE INDEX "pages_blocks_ownership_parent_id_idx" ON "pages_blocks_ownership" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ownership_path_idx" ON "pages_blocks_ownership" USING btree ("_path");
  CREATE INDEX "pages_blocks_team_directory_order_idx" ON "pages_blocks_team_directory" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_directory_parent_id_idx" ON "pages_blocks_team_directory" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_directory_path_idx" ON "pages_blocks_team_directory" USING btree ("_path");
  CREATE INDEX "pages_blocks_group_scale_chain_order_idx" ON "pages_blocks_group_scale_chain" USING btree ("_order");
  CREATE INDEX "pages_blocks_group_scale_chain_parent_id_idx" ON "pages_blocks_group_scale_chain" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_group_scale_order_idx" ON "pages_blocks_group_scale" USING btree ("_order");
  CREATE INDEX "pages_blocks_group_scale_parent_id_idx" ON "pages_blocks_group_scale" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_group_scale_path_idx" ON "pages_blocks_group_scale" USING btree ("_path");
  CREATE INDEX "pages_blocks_group_scale_link_link_page_idx" ON "pages_blocks_group_scale" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_open_roles_order_idx" ON "pages_blocks_open_roles" USING btree ("_order");
  CREATE INDEX "pages_blocks_open_roles_parent_id_idx" ON "pages_blocks_open_roles" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_open_roles_path_idx" ON "pages_blocks_open_roles" USING btree ("_path");
  CREATE INDEX "pages_blocks_open_roles_footer_link_footer_link_page_idx" ON "pages_blocks_open_roles" USING btree ("footer_link_page_id");
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
  CREATE INDEX "pages_blocks_statement_order_idx" ON "pages_blocks_statement" USING btree ("_order");
  CREATE INDEX "pages_blocks_statement_parent_id_idx" ON "pages_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_statement_path_idx" ON "pages_blocks_statement" USING btree ("_path");
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
  CREATE INDEX "pages_blocks_form_promises_order_idx" ON "pages_blocks_form_promises" USING btree ("_order");
  CREATE INDEX "pages_blocks_form_promises_parent_id_idx" ON "pages_blocks_form_promises" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_form_interests_order_idx" ON "pages_blocks_form_interests" USING btree ("_order");
  CREATE INDEX "pages_blocks_form_interests_parent_id_idx" ON "pages_blocks_form_interests" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_form_order_idx" ON "pages_blocks_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_form_parent_id_idx" ON "pages_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_form_path_idx" ON "pages_blocks_form" USING btree ("_path");
  CREATE INDEX "pages_blocks_form_background_image_idx" ON "pages_blocks_form" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_form_aside_link_aside_link_page_idx" ON "pages_blocks_form" USING btree ("aside_link_page_id");
  CREATE INDEX "pages_blocks_form_interest_note_link_interest_note_link__idx" ON "pages_blocks_form" USING btree ("interest_note_link_page_id");
  CREATE INDEX "pages_blocks_offices_order_idx" ON "pages_blocks_offices" USING btree ("_order");
  CREATE INDEX "pages_blocks_offices_parent_id_idx" ON "pages_blocks_offices" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_offices_path_idx" ON "pages_blocks_offices" USING btree ("_path");
  CREATE INDEX "pages_blocks_offices_image_idx" ON "pages_blocks_offices" USING btree ("image_id");
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
  CREATE INDEX "pages_breadcrumbs_order_idx" ON "pages_breadcrumbs" USING btree ("_order");
  CREATE INDEX "pages_breadcrumbs_parent_id_idx" ON "pages_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "pages_breadcrumbs_doc_idx" ON "pages_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_path_idx" ON "pages" USING btree ("path");
  CREATE INDEX "pages_forward_to_idx" ON "pages" USING btree ("forward_to_id");
  CREATE INDEX "pages_parent_idx" ON "pages" USING btree ("parent_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_partners_id_idx" ON "pages_rels" USING btree ("partners_id");
  CREATE INDEX "pages_rels_team_members_id_idx" ON "pages_rels" USING btree ("team_members_id");
  CREATE INDEX "pages_rels_roles_id_idx" ON "pages_rels" USING btree ("roles_id");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_blocks_hero_links_order_idx" ON "_pages_v_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_links_parent_id_idx" ON "_pages_v_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_links_page_idx" ON "_pages_v_blocks_hero_links" USING btree ("page_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_video_idx" ON "_pages_v_blocks_hero" USING btree ("video_id");
  CREATE INDEX "_pages_v_blocks_hero_video_mobile_idx" ON "_pages_v_blocks_hero" USING btree ("video_mobile_id");
  CREATE INDEX "_pages_v_blocks_hero_poster_idx" ON "_pages_v_blocks_hero" USING btree ("poster_id");
  CREATE INDEX "_pages_v_blocks_section_nav_order_idx" ON "_pages_v_blocks_section_nav" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_section_nav_parent_id_idx" ON "_pages_v_blocks_section_nav" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_section_nav_path_idx" ON "_pages_v_blocks_section_nav" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_lead_text_notes_order_idx" ON "_pages_v_blocks_lead_text_notes" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lead_text_notes_parent_id_idx" ON "_pages_v_blocks_lead_text_notes" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lead_text_merge_items_order_idx" ON "_pages_v_blocks_lead_text_merge_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lead_text_merge_items_parent_id_idx" ON "_pages_v_blocks_lead_text_merge_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lead_text_weave_items_order_idx" ON "_pages_v_blocks_lead_text_weave_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lead_text_weave_items_parent_id_idx" ON "_pages_v_blocks_lead_text_weave_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lead_text_weave_items_image_idx" ON "_pages_v_blocks_lead_text_weave_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_lead_text_cross_items_order_idx" ON "_pages_v_blocks_lead_text_cross_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lead_text_cross_items_parent_id_idx" ON "_pages_v_blocks_lead_text_cross_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lead_text_details_list_order_idx" ON "_pages_v_blocks_lead_text_details_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lead_text_details_list_parent_id_idx" ON "_pages_v_blocks_lead_text_details_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lead_text_order_idx" ON "_pages_v_blocks_lead_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lead_text_parent_id_idx" ON "_pages_v_blocks_lead_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lead_text_path_idx" ON "_pages_v_blocks_lead_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_lead_text_closing_link_closing_link_page_idx" ON "_pages_v_blocks_lead_text" USING btree ("closing_link_page_id");
  CREATE INDEX "_pages_v_blocks_media_text_list_items_order_idx" ON "_pages_v_blocks_media_text_list_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_text_list_items_parent_id_idx" ON "_pages_v_blocks_media_text_list_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_text_report_bars_order_idx" ON "_pages_v_blocks_media_text_report_bars" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_text_report_bars_parent_id_idx" ON "_pages_v_blocks_media_text_report_bars" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_text_order_idx" ON "_pages_v_blocks_media_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_text_parent_id_idx" ON "_pages_v_blocks_media_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_text_path_idx" ON "_pages_v_blocks_media_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_text_link_link_page_idx" ON "_pages_v_blocks_media_text" USING btree ("link_page_id");
  CREATE INDEX "_pages_v_blocks_media_text_image_idx" ON "_pages_v_blocks_media_text" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_card_carousel_cards_order_idx" ON "_pages_v_blocks_card_carousel_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_carousel_cards_parent_id_idx" ON "_pages_v_blocks_card_carousel_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_carousel_cards_image_idx" ON "_pages_v_blocks_card_carousel_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_card_carousel_cards_link_link_page_idx" ON "_pages_v_blocks_card_carousel_cards" USING btree ("link_page_id");
  CREATE INDEX "_pages_v_blocks_card_carousel_order_idx" ON "_pages_v_blocks_card_carousel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_carousel_parent_id_idx" ON "_pages_v_blocks_card_carousel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_carousel_path_idx" ON "_pages_v_blocks_card_carousel" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stacked_panels_panels_order_idx" ON "_pages_v_blocks_stacked_panels_panels" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stacked_panels_panels_parent_id_idx" ON "_pages_v_blocks_stacked_panels_panels" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stacked_panels_panels_image_idx" ON "_pages_v_blocks_stacked_panels_panels" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_stacked_panels_panels_link_link_page_idx" ON "_pages_v_blocks_stacked_panels_panels" USING btree ("link_page_id");
  CREATE INDEX "_pages_v_blocks_stacked_panels_order_idx" ON "_pages_v_blocks_stacked_panels" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stacked_panels_parent_id_idx" ON "_pages_v_blocks_stacked_panels" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stacked_panels_path_idx" ON "_pages_v_blocks_stacked_panels" USING btree ("_path");
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
  CREATE INDEX "_pages_v_blocks_stats_carousel_stats_order_idx" ON "_pages_v_blocks_stats_carousel_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_carousel_stats_parent_id_idx" ON "_pages_v_blocks_stats_carousel_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_carousel_stats_image_idx" ON "_pages_v_blocks_stats_carousel_stats" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_stats_carousel_order_idx" ON "_pages_v_blocks_stats_carousel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_carousel_parent_id_idx" ON "_pages_v_blocks_stats_carousel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_carousel_path_idx" ON "_pages_v_blocks_stats_carousel" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_logo_marquee_order_idx" ON "_pages_v_blocks_logo_marquee" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_marquee_parent_id_idx" ON "_pages_v_blocks_logo_marquee" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_marquee_path_idx" ON "_pages_v_blocks_logo_marquee" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_case_study_gallery_items_order_idx" ON "_pages_v_blocks_case_study_gallery_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_case_study_gallery_items_parent_id_idx" ON "_pages_v_blocks_case_study_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_case_study_gallery_items_case_study_idx" ON "_pages_v_blocks_case_study_gallery_items" USING btree ("case_study_id");
  CREATE INDEX "_pages_v_blocks_case_study_gallery_items_image_idx" ON "_pages_v_blocks_case_study_gallery_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_case_study_gallery_order_idx" ON "_pages_v_blocks_case_study_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_case_study_gallery_parent_id_idx" ON "_pages_v_blocks_case_study_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_case_study_gallery_path_idx" ON "_pages_v_blocks_case_study_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_case_study_gallery_link_link_page_idx" ON "_pages_v_blocks_case_study_gallery" USING btree ("link_page_id");
  CREATE INDEX "_pages_v_blocks_case_study_grid_order_idx" ON "_pages_v_blocks_case_study_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_case_study_grid_parent_id_idx" ON "_pages_v_blocks_case_study_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_case_study_grid_path_idx" ON "_pages_v_blocks_case_study_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_case_study_grid_cta_link_cta_link_page_idx" ON "_pages_v_blocks_case_study_grid" USING btree ("cta_link_page_id");
  CREATE INDEX "_pages_v_blocks_ownership_facts_order_idx" ON "_pages_v_blocks_ownership_facts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ownership_facts_parent_id_idx" ON "_pages_v_blocks_ownership_facts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ownership_levels_order_idx" ON "_pages_v_blocks_ownership_levels" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ownership_levels_parent_id_idx" ON "_pages_v_blocks_ownership_levels" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ownership_order_idx" ON "_pages_v_blocks_ownership" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ownership_parent_id_idx" ON "_pages_v_blocks_ownership" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ownership_path_idx" ON "_pages_v_blocks_ownership" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_team_directory_order_idx" ON "_pages_v_blocks_team_directory" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_directory_parent_id_idx" ON "_pages_v_blocks_team_directory" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_directory_path_idx" ON "_pages_v_blocks_team_directory" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_group_scale_chain_order_idx" ON "_pages_v_blocks_group_scale_chain" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_group_scale_chain_parent_id_idx" ON "_pages_v_blocks_group_scale_chain" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_group_scale_order_idx" ON "_pages_v_blocks_group_scale" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_group_scale_parent_id_idx" ON "_pages_v_blocks_group_scale" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_group_scale_path_idx" ON "_pages_v_blocks_group_scale" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_group_scale_link_link_page_idx" ON "_pages_v_blocks_group_scale" USING btree ("link_page_id");
  CREATE INDEX "_pages_v_blocks_open_roles_order_idx" ON "_pages_v_blocks_open_roles" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_open_roles_parent_id_idx" ON "_pages_v_blocks_open_roles" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_open_roles_path_idx" ON "_pages_v_blocks_open_roles" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_open_roles_footer_link_footer_link_page_idx" ON "_pages_v_blocks_open_roles" USING btree ("footer_link_page_id");
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
  CREATE INDEX "_pages_v_blocks_service_detail_path_idx" ON "_pages_v_blocks_service_detail" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_statement_order_idx" ON "_pages_v_blocks_statement" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_statement_parent_id_idx" ON "_pages_v_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_statement_path_idx" ON "_pages_v_blocks_statement" USING btree ("_path");
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
  CREATE INDEX "_pages_v_blocks_form_promises_order_idx" ON "_pages_v_blocks_form_promises" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_form_promises_parent_id_idx" ON "_pages_v_blocks_form_promises" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_form_interests_order_idx" ON "_pages_v_blocks_form_interests" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_form_interests_parent_id_idx" ON "_pages_v_blocks_form_interests" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_form_order_idx" ON "_pages_v_blocks_form" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_form_parent_id_idx" ON "_pages_v_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_form_path_idx" ON "_pages_v_blocks_form" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_form_background_image_idx" ON "_pages_v_blocks_form" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_form_aside_link_aside_link_page_idx" ON "_pages_v_blocks_form" USING btree ("aside_link_page_id");
  CREATE INDEX "_pages_v_blocks_form_interest_note_link_interest_note_li_idx" ON "_pages_v_blocks_form" USING btree ("interest_note_link_page_id");
  CREATE INDEX "_pages_v_blocks_offices_order_idx" ON "_pages_v_blocks_offices" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_offices_parent_id_idx" ON "_pages_v_blocks_offices" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_offices_path_idx" ON "_pages_v_blocks_offices" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_offices_image_idx" ON "_pages_v_blocks_offices" USING btree ("image_id");
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
  CREATE INDEX "_pages_v_version_breadcrumbs_order_idx" ON "_pages_v_version_breadcrumbs" USING btree ("_order");
  CREATE INDEX "_pages_v_version_breadcrumbs_parent_id_idx" ON "_pages_v_version_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_breadcrumbs_doc_idx" ON "_pages_v_version_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_path_idx" ON "_pages_v" USING btree ("version_path");
  CREATE INDEX "_pages_v_version_version_forward_to_idx" ON "_pages_v" USING btree ("version_forward_to_id");
  CREATE INDEX "_pages_v_version_version_parent_idx" ON "_pages_v" USING btree ("version_parent_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_partners_id_idx" ON "_pages_v_rels" USING btree ("partners_id");
  CREATE INDEX "_pages_v_rels_team_members_id_idx" ON "_pages_v_rels" USING btree ("team_members_id");
  CREATE INDEX "_pages_v_rels_roles_id_idx" ON "_pages_v_rels" USING btree ("roles_id");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "case_studies_services_order_idx" ON "case_studies_services" USING btree ("order");
  CREATE INDEX "case_studies_services_parent_idx" ON "case_studies_services" USING btree ("parent_id");
  CREATE INDEX "case_studies_results_order_idx" ON "case_studies_results" USING btree ("_order");
  CREATE INDEX "case_studies_results_parent_id_idx" ON "case_studies_results" USING btree ("_parent_id");
  CREATE INDEX "case_studies_points_order_idx" ON "case_studies_points" USING btree ("_order");
  CREATE INDEX "case_studies_points_parent_id_idx" ON "case_studies_points" USING btree ("_parent_id");
  CREATE INDEX "case_studies_gallery_order_idx" ON "case_studies_gallery" USING btree ("_order");
  CREATE INDEX "case_studies_gallery_parent_id_idx" ON "case_studies_gallery" USING btree ("_parent_id");
  CREATE INDEX "case_studies_gallery_image_idx" ON "case_studies_gallery" USING btree ("image_id");
  CREATE INDEX "case_studies_image_idx" ON "case_studies" USING btree ("image_id");
  CREATE INDEX "case_studies_video_idx" ON "case_studies" USING btree ("video_id");
  CREATE INDEX "case_studies_still_idx" ON "case_studies" USING btree ("still_id");
  CREATE INDEX "case_studies_film_idx" ON "case_studies" USING btree ("film_id");
  CREATE UNIQUE INDEX "case_studies_slug_idx" ON "case_studies" USING btree ("slug");
  CREATE INDEX "case_studies_updated_at_idx" ON "case_studies" USING btree ("updated_at");
  CREATE INDEX "case_studies_created_at_idx" ON "case_studies" USING btree ("created_at");
  CREATE INDEX "partners_logo_idx" ON "partners" USING btree ("logo_id");
  CREATE INDEX "partners_updated_at_idx" ON "partners" USING btree ("updated_at");
  CREATE INDEX "partners_created_at_idx" ON "partners" USING btree ("created_at");
  CREATE INDEX "team_members_photo_idx" ON "team_members" USING btree ("photo_id");
  CREATE INDEX "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  CREATE INDEX "roles_points_order_idx" ON "roles_points" USING btree ("_order");
  CREATE INDEX "roles_points_parent_id_idx" ON "roles_points" USING btree ("_parent_id");
  CREATE INDEX "roles_updated_at_idx" ON "roles" USING btree ("updated_at");
  CREATE INDEX "roles_created_at_idx" ON "roles" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_case_studies_id_idx" ON "payload_locked_documents_rels" USING btree ("case_studies_id");
  CREATE INDEX "payload_locked_documents_rels_partners_id_idx" ON "payload_locked_documents_rels" USING btree ("partners_id");
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");
  CREATE INDEX "payload_locked_documents_rels_roles_id_idx" ON "payload_locked_documents_rels" USING btree ("roles_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_header_links_sub_links_order_idx" ON "site_settings_header_links_sub_links" USING btree ("_order");
  CREATE INDEX "site_settings_header_links_sub_links_parent_id_idx" ON "site_settings_header_links_sub_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_header_links_sub_links_page_idx" ON "site_settings_header_links_sub_links" USING btree ("page_id");
  CREATE INDEX "site_settings_header_links_order_idx" ON "site_settings_header_links" USING btree ("_order");
  CREATE INDEX "site_settings_header_links_parent_id_idx" ON "site_settings_header_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_header_links_page_idx" ON "site_settings_header_links" USING btree ("page_id");
  CREATE INDEX "site_settings_footer_links_order_idx" ON "site_settings_footer_links" USING btree ("_order");
  CREATE INDEX "site_settings_footer_links_parent_id_idx" ON "site_settings_footer_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_links_page_idx" ON "site_settings_footer_links" USING btree ("page_id");
  CREATE INDEX "site_settings_legal_links_order_idx" ON "site_settings_legal_links" USING btree ("_order");
  CREATE INDEX "site_settings_legal_links_parent_id_idx" ON "site_settings_legal_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_legal_links_page_idx" ON "site_settings_legal_links" USING btree ("page_id");
  CREATE INDEX "site_settings_social_order_idx" ON "site_settings_social" USING btree ("_order");
  CREATE INDEX "site_settings_social_parent_id_idx" ON "site_settings_social" USING btree ("_parent_id");
  CREATE INDEX "site_settings_cta_link_cta_link_page_idx" ON "site_settings" USING btree ("cta_link_page_id");
  CREATE INDEX "site_settings_cta_cta_image_idx" ON "site_settings" USING btree ("cta_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_hero_links" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_section_nav" CASCADE;
  DROP TABLE "pages_blocks_lead_text_notes" CASCADE;
  DROP TABLE "pages_blocks_lead_text_merge_items" CASCADE;
  DROP TABLE "pages_blocks_lead_text_weave_items" CASCADE;
  DROP TABLE "pages_blocks_lead_text_cross_items" CASCADE;
  DROP TABLE "pages_blocks_lead_text_details_list" CASCADE;
  DROP TABLE "pages_blocks_lead_text" CASCADE;
  DROP TABLE "pages_blocks_media_text_list_items" CASCADE;
  DROP TABLE "pages_blocks_media_text_report_bars" CASCADE;
  DROP TABLE "pages_blocks_media_text" CASCADE;
  DROP TABLE "pages_blocks_card_carousel_cards" CASCADE;
  DROP TABLE "pages_blocks_card_carousel" CASCADE;
  DROP TABLE "pages_blocks_stacked_panels_panels" CASCADE;
  DROP TABLE "pages_blocks_stacked_panels" CASCADE;
  DROP TABLE "pages_blocks_statements_items" CASCADE;
  DROP TABLE "pages_blocks_statements" CASCADE;
  DROP TABLE "pages_blocks_background_text_ticker" CASCADE;
  DROP TABLE "pages_blocks_background_text" CASCADE;
  DROP TABLE "pages_blocks_stats_carousel_stats" CASCADE;
  DROP TABLE "pages_blocks_stats_carousel" CASCADE;
  DROP TABLE "pages_blocks_logo_marquee" CASCADE;
  DROP TABLE "pages_blocks_case_study_gallery_items" CASCADE;
  DROP TABLE "pages_blocks_case_study_gallery" CASCADE;
  DROP TABLE "pages_blocks_case_study_grid" CASCADE;
  DROP TABLE "pages_blocks_ownership_facts" CASCADE;
  DROP TABLE "pages_blocks_ownership_levels" CASCADE;
  DROP TABLE "pages_blocks_ownership" CASCADE;
  DROP TABLE "pages_blocks_team_directory" CASCADE;
  DROP TABLE "pages_blocks_group_scale_chain" CASCADE;
  DROP TABLE "pages_blocks_group_scale" CASCADE;
  DROP TABLE "pages_blocks_open_roles" CASCADE;
  DROP TABLE "pages_blocks_service_detail_links" CASCADE;
  DROP TABLE "pages_blocks_svc_image" CASCADE;
  DROP TABLE "pages_blocks_svc_highlight" CASCADE;
  DROP TABLE "pages_blocks_svc_list_items" CASCADE;
  DROP TABLE "pages_blocks_svc_list" CASCADE;
  DROP TABLE "pages_blocks_svc_collage_images" CASCADE;
  DROP TABLE "pages_blocks_svc_collage" CASCADE;
  DROP TABLE "pages_blocks_service_detail" CASCADE;
  DROP TABLE "pages_blocks_statement" CASCADE;
  DROP TABLE "pages_blocks_link_tiles_tiles" CASCADE;
  DROP TABLE "pages_blocks_link_tiles" CASCADE;
  DROP TABLE "pages_blocks_cta_banner" CASCADE;
  DROP TABLE "pages_blocks_form_promises" CASCADE;
  DROP TABLE "pages_blocks_form_interests" CASCADE;
  DROP TABLE "pages_blocks_form" CASCADE;
  DROP TABLE "pages_blocks_offices" CASCADE;
  DROP TABLE "pages_blocks_legal_document_facts" CASCADE;
  DROP TABLE "pages_blocks_legal_document_notice_points" CASCADE;
  DROP TABLE "legal_cookies" CASCADE;
  DROP TABLE "pages_blocks_legal_document_sections" CASCADE;
  DROP TABLE "pages_blocks_legal_document" CASCADE;
  DROP TABLE "pages_breadcrumbs" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_section_nav" CASCADE;
  DROP TABLE "_pages_v_blocks_lead_text_notes" CASCADE;
  DROP TABLE "_pages_v_blocks_lead_text_merge_items" CASCADE;
  DROP TABLE "_pages_v_blocks_lead_text_weave_items" CASCADE;
  DROP TABLE "_pages_v_blocks_lead_text_cross_items" CASCADE;
  DROP TABLE "_pages_v_blocks_lead_text_details_list" CASCADE;
  DROP TABLE "_pages_v_blocks_lead_text" CASCADE;
  DROP TABLE "_pages_v_blocks_media_text_list_items" CASCADE;
  DROP TABLE "_pages_v_blocks_media_text_report_bars" CASCADE;
  DROP TABLE "_pages_v_blocks_media_text" CASCADE;
  DROP TABLE "_pages_v_blocks_card_carousel_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_card_carousel" CASCADE;
  DROP TABLE "_pages_v_blocks_stacked_panels_panels" CASCADE;
  DROP TABLE "_pages_v_blocks_stacked_panels" CASCADE;
  DROP TABLE "_pages_v_blocks_statements_items" CASCADE;
  DROP TABLE "_pages_v_blocks_statements" CASCADE;
  DROP TABLE "_pages_v_blocks_background_text_ticker" CASCADE;
  DROP TABLE "_pages_v_blocks_background_text" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_carousel_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_carousel" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_marquee" CASCADE;
  DROP TABLE "_pages_v_blocks_case_study_gallery_items" CASCADE;
  DROP TABLE "_pages_v_blocks_case_study_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_case_study_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_ownership_facts" CASCADE;
  DROP TABLE "_pages_v_blocks_ownership_levels" CASCADE;
  DROP TABLE "_pages_v_blocks_ownership" CASCADE;
  DROP TABLE "_pages_v_blocks_team_directory" CASCADE;
  DROP TABLE "_pages_v_blocks_group_scale_chain" CASCADE;
  DROP TABLE "_pages_v_blocks_group_scale" CASCADE;
  DROP TABLE "_pages_v_blocks_open_roles" CASCADE;
  DROP TABLE "_pages_v_blocks_service_detail_links" CASCADE;
  DROP TABLE "_pages_v_blocks_svc_image" CASCADE;
  DROP TABLE "_pages_v_blocks_svc_highlight" CASCADE;
  DROP TABLE "_pages_v_blocks_svc_list_items" CASCADE;
  DROP TABLE "_pages_v_blocks_svc_list" CASCADE;
  DROP TABLE "_pages_v_blocks_svc_collage_images" CASCADE;
  DROP TABLE "_pages_v_blocks_svc_collage" CASCADE;
  DROP TABLE "_pages_v_blocks_service_detail" CASCADE;
  DROP TABLE "_pages_v_blocks_statement" CASCADE;
  DROP TABLE "_pages_v_blocks_link_tiles_tiles" CASCADE;
  DROP TABLE "_pages_v_blocks_link_tiles" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_form_promises" CASCADE;
  DROP TABLE "_pages_v_blocks_form_interests" CASCADE;
  DROP TABLE "_pages_v_blocks_form" CASCADE;
  DROP TABLE "_pages_v_blocks_offices" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_document_facts" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_document_notice_points" CASCADE;
  DROP TABLE "_legal_cookies_v" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_document_sections" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_document" CASCADE;
  DROP TABLE "_pages_v_version_breadcrumbs" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "case_studies_services" CASCADE;
  DROP TABLE "case_studies_results" CASCADE;
  DROP TABLE "case_studies_points" CASCADE;
  DROP TABLE "case_studies_gallery" CASCADE;
  DROP TABLE "case_studies" CASCADE;
  DROP TABLE "partners" CASCADE;
  DROP TABLE "team_members" CASCADE;
  DROP TABLE "roles_points" CASCADE;
  DROP TABLE "roles" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_header_links_sub_links" CASCADE;
  DROP TABLE "site_settings_header_links" CASCADE;
  DROP TABLE "site_settings_footer_links" CASCADE;
  DROP TABLE "site_settings_legal_links" CASCADE;
  DROP TABLE "site_settings_social" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_hero_links_appearance";
  DROP TYPE "public"."enum_pages_blocks_hero_links_type";
  DROP TYPE "public"."enum_pages_blocks_hero_variant";
  DROP TYPE "public"."enum_pages_blocks_hero_headline_size";
  DROP TYPE "public"."enum_pages_blocks_hero_image_style";
  DROP TYPE "public"."enum_pages_blocks_section_nav_source";
  DROP TYPE "public"."enum_pages_blocks_section_nav_bar_style";
  DROP TYPE "public"."enum_pages_blocks_lead_text_text_size";
  DROP TYPE "public"."enum_pages_blocks_lead_text_animation";
  DROP TYPE "public"."enum_pages_blocks_lead_text_highlight_mode";
  DROP TYPE "public"."enum_pages_blocks_lead_text_diagram";
  DROP TYPE "public"."enum_pages_blocks_lead_text_closing_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_lead_text_closing_link_type";
  DROP TYPE "public"."enum_pages_blocks_media_text_variant";
  DROP TYPE "public"."enum_pages_blocks_media_text_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_media_text_link_type";
  DROP TYPE "public"."enum_pages_blocks_media_text_image_position";
  DROP TYPE "public"."enum_pages_blocks_card_carousel_cards_link_type";
  DROP TYPE "public"."enum_pages_blocks_card_carousel_card_style";
  DROP TYPE "public"."enum_pages_blocks_card_carousel_theme";
  DROP TYPE "public"."enum_pages_blocks_stacked_panels_panels_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_stacked_panels_panels_link_type";
  DROP TYPE "public"."enum_pages_blocks_case_study_gallery_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_case_study_gallery_link_type";
  DROP TYPE "public"."enum_pages_blocks_case_study_grid_cta_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_case_study_grid_cta_link_type";
  DROP TYPE "public"."enum_pages_blocks_group_scale_link_type";
  DROP TYPE "public"."enum_pages_blocks_open_roles_footer_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_open_roles_footer_link_type";
  DROP TYPE "public"."enum_pages_blocks_service_detail_links_appearance";
  DROP TYPE "public"."enum_pages_blocks_service_detail_links_type";
  DROP TYPE "public"."enum_pages_blocks_svc_list_items_link_type";
  DROP TYPE "public"."enum_pages_blocks_statement_style";
  DROP TYPE "public"."enum_pages_blocks_statement_animation";
  DROP TYPE "public"."enum_pages_blocks_link_tiles_tiles_link_type";
  DROP TYPE "public"."enum_pages_blocks_link_tiles_tile_style";
  DROP TYPE "public"."enum_pages_blocks_cta_banner_custom_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_cta_banner_custom_link_type";
  DROP TYPE "public"."enum_pages_blocks_form_form_type";
  DROP TYPE "public"."enum_pages_blocks_form_aside_link_type";
  DROP TYPE "public"."enum_pages_blocks_form_interest_note_link_type";
  DROP TYPE "public"."enum_pages_blocks_offices_time_zone";
  DROP TYPE "public"."enum_legal_cookie_category";
  DROP TYPE "public"."enum_pages_blocks_legal_document_ask_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_legal_document_ask_link_type";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_links_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_hero_links_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_variant";
  DROP TYPE "public"."enum__pages_v_blocks_hero_headline_size";
  DROP TYPE "public"."enum__pages_v_blocks_hero_image_style";
  DROP TYPE "public"."enum__pages_v_blocks_section_nav_source";
  DROP TYPE "public"."enum__pages_v_blocks_section_nav_bar_style";
  DROP TYPE "public"."enum__pages_v_blocks_lead_text_text_size";
  DROP TYPE "public"."enum__pages_v_blocks_lead_text_animation";
  DROP TYPE "public"."enum__pages_v_blocks_lead_text_highlight_mode";
  DROP TYPE "public"."enum__pages_v_blocks_lead_text_diagram";
  DROP TYPE "public"."enum__pages_v_blocks_lead_text_closing_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_lead_text_closing_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_media_text_variant";
  DROP TYPE "public"."enum__pages_v_blocks_media_text_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_media_text_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_media_text_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_card_carousel_cards_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_card_carousel_card_style";
  DROP TYPE "public"."enum__pages_v_blocks_card_carousel_theme";
  DROP TYPE "public"."enum__pages_v_blocks_stacked_panels_panels_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_stacked_panels_panels_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_case_study_gallery_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_case_study_gallery_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_case_study_grid_cta_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_case_study_grid_cta_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_group_scale_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_open_roles_footer_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_open_roles_footer_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_service_detail_links_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_service_detail_links_type";
  DROP TYPE "public"."enum__pages_v_blocks_svc_list_items_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_statement_style";
  DROP TYPE "public"."enum__pages_v_blocks_statement_animation";
  DROP TYPE "public"."enum__pages_v_blocks_link_tiles_tiles_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_link_tiles_tile_style";
  DROP TYPE "public"."enum__pages_v_blocks_cta_banner_custom_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_cta_banner_custom_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_form_form_type";
  DROP TYPE "public"."enum__pages_v_blocks_form_aside_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_form_interest_note_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_offices_time_zone";
  DROP TYPE "public"."enum__pages_v_blocks_legal_document_ask_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_legal_document_ask_link_type";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_case_studies_services";
  DROP TYPE "public"."enum_team_members_group";
  DROP TYPE "public"."enum_team_members_department";
  DROP TYPE "public"."enum_roles_team";
  DROP TYPE "public"."enum_roles_employment_type";
  DROP TYPE "public"."enum_form_submissions_form";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_site_settings_header_links_sub_links_type";
  DROP TYPE "public"."enum_site_settings_header_links_type";
  DROP TYPE "public"."enum_site_settings_footer_links_type";
  DROP TYPE "public"."enum_site_settings_legal_links_type";
  DROP TYPE "public"."enum_site_settings_social_platform";
  DROP TYPE "public"."enum_site_settings_cta_link_appearance";
  DROP TYPE "public"."enum_site_settings_cta_link_type";`)
}

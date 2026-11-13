import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero" ADD COLUMN "video_mobile_id" integer;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "video_mobile_id" integer;
  ALTER TABLE "media" ADD COLUMN "prefix" varchar DEFAULT 'media';
  ALTER TABLE "media" ADD COLUMN "_objectkey" varchar;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_video_mobile_id_media_id_fk" FOREIGN KEY ("video_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_video_mobile_id_media_id_fk" FOREIGN KEY ("video_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_video_mobile_idx" ON "pages_blocks_hero" USING btree ("video_mobile_id");
  CREATE INDEX "_pages_v_blocks_hero_video_mobile_idx" ON "_pages_v_blocks_hero" USING btree ("video_mobile_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero" DROP CONSTRAINT "pages_blocks_hero_video_mobile_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_hero" DROP CONSTRAINT "_pages_v_blocks_hero_video_mobile_id_media_id_fk";
  
  DROP INDEX "pages_blocks_hero_video_mobile_idx";
  DROP INDEX "_pages_v_blocks_hero_video_mobile_idx";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "video_mobile_id";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "video_mobile_id";
  ALTER TABLE "media" DROP COLUMN "prefix";
  ALTER TABLE "media" DROP COLUMN "_objectkey";`)
}

import * as migration_20261113_150619_initial from './20261113_150619_initial';
import * as migration_20261113_154236_media_storage_and_mobile_video from './20261113_154236_media_storage_and_mobile_video';
import * as migration_20261113_194317_about_page_blocks from './20261113_194317_about_page_blocks';
import * as migration_20261114_021140_our_story_options from './20261114_021140_our_story_options';
import * as migration_20261114_080037_team_page from './20261114_080037_team_page';

export const migrations = [
  {
    up: migration_20261113_150619_initial.up,
    down: migration_20261113_150619_initial.down,
    name: '20261113_150619_initial',
  },
  {
    up: migration_20261113_154236_media_storage_and_mobile_video.up,
    down: migration_20261113_154236_media_storage_and_mobile_video.down,
    name: '20261113_154236_media_storage_and_mobile_video',
  },
  {
    up: migration_20261113_194317_about_page_blocks.up,
    down: migration_20261113_194317_about_page_blocks.down,
    name: '20261113_194317_about_page_blocks',
  },
  {
    up: migration_20261114_021140_our_story_options.up,
    down: migration_20261114_021140_our_story_options.down,
    name: '20261114_021140_our_story_options',
  },
  {
    up: migration_20261114_080037_team_page.up,
    down: migration_20261114_080037_team_page.down,
    name: '20261114_080037_team_page'
  },
];

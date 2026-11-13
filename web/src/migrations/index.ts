import * as migration_20261113_150619_initial from './20261113_150619_initial';
import * as migration_20261113_154236_media_storage_and_mobile_video from './20261113_154236_media_storage_and_mobile_video';

export const migrations = [
  {
    up: migration_20261113_150619_initial.up,
    down: migration_20261113_150619_initial.down,
    name: '20261113_150619_initial',
  },
  {
    up: migration_20261113_154236_media_storage_and_mobile_video.up,
    down: migration_20261113_154236_media_storage_and_mobile_video.down,
    name: '20261113_154236_media_storage_and_mobile_video'
  },
];

import * as migration_20261118_161446_initial from './20261118_161446_initial';
import * as migration_20261119_174010_users_admin_default_no_scheduling from './20261119_174010_users_admin_default_no_scheduling';

export const migrations = [
  {
    up: migration_20261118_161446_initial.up,
    down: migration_20261118_161446_initial.down,
    name: '20261118_161446_initial',
  },
  {
    up: migration_20261119_174010_users_admin_default_no_scheduling.up,
    down: migration_20261119_174010_users_admin_default_no_scheduling.down,
    name: '20261119_174010_users_admin_default_no_scheduling'
  },
];

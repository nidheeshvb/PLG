import * as migration_20261118_161446_initial from './20261118_161446_initial';

export const migrations = [
  {
    up: migration_20261118_161446_initial.up,
    down: migration_20261118_161446_initial.down,
    name: '20261118_161446_initial'
  },
];

import * as migration_20261113_150619_initial from './20261113_150619_initial';

export const migrations = [
  {
    up: migration_20261113_150619_initial.up,
    down: migration_20261113_150619_initial.down,
    name: '20261113_150619_initial'
  },
];

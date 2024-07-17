import { IMigrations, NewMigrations } from './migrations.model';

export const sampleWithRequiredData: IMigrations = {
  id: 381,
};

export const sampleWithPartialData: IMigrations = {
  id: 11572,
  migration: 'self-assured representation',
  batch: 8949,
};

export const sampleWithFullData: IMigrations = {
  id: 15027,
  migration: 'and sulk',
  batch: 24724,
};

export const sampleWithNewData: NewMigrations = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

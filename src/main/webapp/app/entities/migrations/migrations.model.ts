export interface IMigrations {
  id: number;
  migration?: string | null;
  batch?: number | null;
}

export type NewMigrations = Omit<IMigrations, 'id'> & { id: null };

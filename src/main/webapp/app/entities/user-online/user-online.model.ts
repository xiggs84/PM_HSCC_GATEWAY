export interface IUserOnline {
  id: number;
  sessionId?: string | null;
  time?: number | null;
  browser?: string | null;
}

export type NewUserOnline = Omit<IUserOnline, 'id'> & { id: null };

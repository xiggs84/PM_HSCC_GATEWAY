export interface IQuyen {
  id: number;
  idQuyen?: number | null;
  tenQuyen?: string | null;
}

export type NewQuyen = Omit<IQuyen, 'id'> & { id: null };

export interface IMenuQuyen {
  id: number;
  idQuyen?: number | null;
  idDonVi?: number | null;
  listMenu?: string | null;
}

export type NewMenuQuyen = Omit<IMenuQuyen, 'id'> & { id: null };

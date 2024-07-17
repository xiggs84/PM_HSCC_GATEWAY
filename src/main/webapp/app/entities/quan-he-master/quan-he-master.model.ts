export interface IQuanHeMaster {
  id: number;
  idDuongSu?: number | null;
  idDuongSuQh?: number | null;
}

export type NewQuanHeMaster = Omit<IQuanHeMaster, 'id'> & { id: null };

export interface ITaisanSaiQsddDgc {
  id: number;
  idMaster?: number | null;
  noiCapQsdd?: string | null;
}

export type NewTaisanSaiQsddDgc = Omit<ITaisanSaiQsddDgc, 'id'> & { id: null };

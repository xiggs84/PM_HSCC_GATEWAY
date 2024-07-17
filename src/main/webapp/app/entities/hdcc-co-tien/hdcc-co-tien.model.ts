export interface IHdccCoTien {
  id: number;
  idMaster?: number | null;
  soCongChung?: number | null;
  soTienRutTrich?: number | null;
}

export type NewHdccCoTien = Omit<IHdccCoTien, 'id'> & { id: null };

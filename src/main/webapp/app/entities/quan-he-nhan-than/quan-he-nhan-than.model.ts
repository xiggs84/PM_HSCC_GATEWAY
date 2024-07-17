export interface IQuanHeNhanThan {
  id: number;
  idQuanHe?: number | null;
  dienGiai?: string | null;
  idQuanHeDoiUng?: number | null;
  idGioiTinh?: number | null;
}

export type NewQuanHeNhanThan = Omit<IQuanHeNhanThan, 'id'> & { id: null };

export interface IDanhMucCapQuanLy {
  id: number;
  idCapQl?: number | null;
  dienGiai?: string | null;
}

export type NewDanhMucCapQuanLy = Omit<IDanhMucCapQuanLy, 'id'> & { id: null };

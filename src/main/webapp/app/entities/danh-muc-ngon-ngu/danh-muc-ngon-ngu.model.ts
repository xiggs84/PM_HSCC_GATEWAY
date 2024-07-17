export interface IDanhMucNgonNgu {
  id: number;
  idNgonNgu?: number | null;
  dienGiai?: string | null;
  vietTat?: string | null;
}

export type NewDanhMucNgonNgu = Omit<IDanhMucNgonNgu, 'id'> & { id: null };

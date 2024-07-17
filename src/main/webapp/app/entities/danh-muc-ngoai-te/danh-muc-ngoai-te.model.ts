export interface IDanhMucNgoaiTe {
  id: number;
  idLoai?: number | null;
  dienGiai?: string | null;
}

export type NewDanhMucNgoaiTe = Omit<IDanhMucNgoaiTe, 'id'> & { id: null };

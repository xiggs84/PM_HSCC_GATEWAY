export interface IDanhMucDauSoCmnd {
  id: number;
  idDauSo?: number | null;
  dauSo?: string | null;
  tinhThanh?: string | null;
  idLoai?: number | null;
}

export type NewDanhMucDauSoCmnd = Omit<IDanhMucDauSoCmnd, 'id'> & { id: null };

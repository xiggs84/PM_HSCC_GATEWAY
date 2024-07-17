export interface IDanhMucQuocGia {
  id: number;
  idQuocGia?: number | null;
  tenQuocGia?: string | null;
  tenTiengAnh?: string | null;
}

export type NewDanhMucQuocGia = Omit<IDanhMucQuocGia, 'id'> & { id: null };

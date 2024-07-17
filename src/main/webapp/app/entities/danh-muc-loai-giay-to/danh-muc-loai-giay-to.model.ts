export interface IDanhMucLoaiGiayTo {
  id: number;
  idLoaiGiayTo?: number | null;
  dienGiai?: string | null;
}

export type NewDanhMucLoaiGiayTo = Omit<IDanhMucLoaiGiayTo, 'id'> & { id: null };

export interface IDanhMucLoaiDonVi {
  id: number;
  idLoaiDv?: number | null;
  dienGiai?: string | null;
}

export type NewDanhMucLoaiDonVi = Omit<IDanhMucLoaiDonVi, 'id'> & { id: null };

export interface IDanhMucKeyDanhTuFaq {
  id: number;
  idCauHoi?: number | null;
  keyDanhTu?: string | null;
}

export type NewDanhMucKeyDanhTuFaq = Omit<IDanhMucKeyDanhTuFaq, 'id'> & { id: null };

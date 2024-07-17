export interface IDanhMucKeyDongTuFaq {
  id: number;
  idCauHoi?: number | null;
  keyDongTu?: string | null;
}

export type NewDanhMucKeyDongTuFaq = Omit<IDanhMucKeyDongTuFaq, 'id'> & { id: null };

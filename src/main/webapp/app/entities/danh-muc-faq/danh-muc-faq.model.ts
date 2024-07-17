export interface IDanhMucFaq {
  id: number;
  idCauHoi?: number | null;
  noiDung?: string | null;
  cauTraLoi?: string | null;
  loai?: number | null;
}

export type NewDanhMucFaq = Omit<IDanhMucFaq, 'id'> & { id: null };

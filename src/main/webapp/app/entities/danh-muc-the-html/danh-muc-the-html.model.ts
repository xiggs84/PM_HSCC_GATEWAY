export interface IDanhMucTheHtml {
  id: number;
  idType?: number | null;
  type?: string | null;
  dienGiai?: string | null;
}

export type NewDanhMucTheHtml = Omit<IDanhMucTheHtml, 'id'> & { id: null };

import { IDanhMucDonVi } from 'app/entities/danh-muc-don-vi/danh-muc-don-vi.model';

export interface ICanBoQuyen {
  id: number;
  idQuyen?: number | null;
  idDonVi?: Pick<IDanhMucDonVi, 'id'> | null;
}

export type NewCanBoQuyen = Omit<ICanBoQuyen, 'id'> & { id: null };

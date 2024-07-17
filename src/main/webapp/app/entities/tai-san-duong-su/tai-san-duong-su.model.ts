import dayjs from 'dayjs/esm';
import { ITaiSan } from 'app/entities/tai-san/tai-san.model';

export interface ITaiSanDuongSu {
  id: number;
  trangThai?: number | null;
  idDuongSu?: number | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  idLoaiHopDong?: number | null;
  idChungThuc?: number | null;
  idTaiSan?: Pick<ITaiSan, 'id'> | null;
}

export type NewTaiSanDuongSu = Omit<ITaiSanDuongSu, 'id'> & { id: null };

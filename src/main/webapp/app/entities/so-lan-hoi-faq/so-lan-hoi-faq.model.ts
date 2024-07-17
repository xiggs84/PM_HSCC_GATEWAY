import dayjs from 'dayjs/esm';

export interface ISoLanHoiFaq {
  id: number;
  idCauHoi?: number | null;
  idCanBo?: number | null;
  ngayThaoTac?: dayjs.Dayjs | null;
}

export type NewSoLanHoiFaq = Omit<ISoLanHoiFaq, 'id'> & { id: null };

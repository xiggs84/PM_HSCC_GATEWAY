import dayjs from 'dayjs/esm';

export interface IDanhsachDsNganchanTmp {
  id: number;
  idDoiTuong?: number | null;
  ngayNganChan?: dayjs.Dayjs | null;
  soHsCv?: string | null;
  soCc?: string | null;
  soVaoSo?: string | null;
  moTa?: string | null;
  idDoituongGoc?: number | null;
  loaiNganChan?: number | null;
  loaiDoiTuong?: number | null;
}

export type NewDanhsachDsNganchanTmp = Omit<IDanhsachDsNganchanTmp, 'id'> & { id: null };

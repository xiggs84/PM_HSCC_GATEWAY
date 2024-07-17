import dayjs from 'dayjs/esm';

export interface IDanhMucFileUploadKyso {
  id: number;
  idFile?: number | null;
  tenFile?: string | null;
  fileUrl?: string | null;
  fileSignedUrl?: string | null;
  idCanBo?: number | null;
  idDonVi?: number | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  trangThai?: number | null;
  filePdfUrl?: string | null;
}

export type NewDanhMucFileUploadKyso = Omit<IDanhMucFileUploadKyso, 'id'> & { id: null };

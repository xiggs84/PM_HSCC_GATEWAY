import dayjs from 'dayjs/esm';

export interface IUsers {
  id: number;
  name?: string | null;
  email?: string | null;
  password?: string | null;
  rememberToken?: string | null;
  createdAt?: dayjs.Dayjs | null;
  updatedAt?: dayjs.Dayjs | null;
  idDonVi?: number | null;
}

export type NewUsers = Omit<IUsers, 'id'> & { id: null };

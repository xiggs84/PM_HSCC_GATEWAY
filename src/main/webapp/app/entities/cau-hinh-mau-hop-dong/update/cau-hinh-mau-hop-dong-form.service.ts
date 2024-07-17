import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICauHinhMauHopDong, NewCauHinhMauHopDong } from '../cau-hinh-mau-hop-dong.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICauHinhMauHopDong for edit and NewCauHinhMauHopDongFormGroupInput for create.
 */
type CauHinhMauHopDongFormGroupInput = ICauHinhMauHopDong | PartialWithRequiredKeyOf<NewCauHinhMauHopDong>;

type CauHinhMauHopDongFormDefaults = Pick<NewCauHinhMauHopDong, 'id'>;

type CauHinhMauHopDongFormGroupContent = {
  id: FormControl<ICauHinhMauHopDong['id'] | NewCauHinhMauHopDong['id']>;
  idLoaiHd: FormControl<ICauHinhMauHopDong['idLoaiHd']>;
  dienGiai: FormControl<ICauHinhMauHopDong['dienGiai']>;
  idVaiTro1: FormControl<ICauHinhMauHopDong['idVaiTro1']>;
  idVaiTro2: FormControl<ICauHinhMauHopDong['idVaiTro2']>;
  fileHopDong: FormControl<ICauHinhMauHopDong['fileHopDong']>;
  srcHopDong: FormControl<ICauHinhMauHopDong['srcHopDong']>;
  dieuKhoan: FormControl<ICauHinhMauHopDong['dieuKhoan']>;
  idDonVi: FormControl<ICauHinhMauHopDong['idDonVi']>;
  trangThai: FormControl<ICauHinhMauHopDong['trangThai']>;
  ngayThaoTac: FormControl<ICauHinhMauHopDong['ngayThaoTac']>;
  nguoiThaoTac: FormControl<ICauHinhMauHopDong['nguoiThaoTac']>;
  srcLoiChung: FormControl<ICauHinhMauHopDong['srcLoiChung']>;
  idNhom: FormControl<ICauHinhMauHopDong['idNhom']>;
  fileLoiChung: FormControl<ICauHinhMauHopDong['fileLoiChung']>;
  chuyenTaiSan: FormControl<ICauHinhMauHopDong['chuyenTaiSan']>;
  loaiSuaDoi: FormControl<ICauHinhMauHopDong['loaiSuaDoi']>;
  loaiHuyBo: FormControl<ICauHinhMauHopDong['loaiHuyBo']>;
  trangThaiDuyet: FormControl<ICauHinhMauHopDong['trangThaiDuyet']>;
  idPhanLoaiHopDong: FormControl<ICauHinhMauHopDong['idPhanLoaiHopDong']>;
  srcCv: FormControl<ICauHinhMauHopDong['srcCv']>;
  srcTb: FormControl<ICauHinhMauHopDong['srcTb']>;
  srcTtpc: FormControl<ICauHinhMauHopDong['srcTtpc']>;
  idVaiTro3: FormControl<ICauHinhMauHopDong['idVaiTro3']>;
  idLoaiHD: FormControl<ICauHinhMauHopDong['idLoaiHD']>;
  idPhanLoaiHD: FormControl<ICauHinhMauHopDong['idPhanLoaiHD']>;
};

export type CauHinhMauHopDongFormGroup = FormGroup<CauHinhMauHopDongFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CauHinhMauHopDongFormService {
  createCauHinhMauHopDongFormGroup(cauHinhMauHopDong: CauHinhMauHopDongFormGroupInput = { id: null }): CauHinhMauHopDongFormGroup {
    const cauHinhMauHopDongRawValue = {
      ...this.getFormDefaults(),
      ...cauHinhMauHopDong,
    };
    return new FormGroup<CauHinhMauHopDongFormGroupContent>({
      id: new FormControl(
        { value: cauHinhMauHopDongRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idLoaiHd: new FormControl(cauHinhMauHopDongRawValue.idLoaiHd),
      dienGiai: new FormControl(cauHinhMauHopDongRawValue.dienGiai),
      idVaiTro1: new FormControl(cauHinhMauHopDongRawValue.idVaiTro1),
      idVaiTro2: new FormControl(cauHinhMauHopDongRawValue.idVaiTro2),
      fileHopDong: new FormControl(cauHinhMauHopDongRawValue.fileHopDong),
      srcHopDong: new FormControl(cauHinhMauHopDongRawValue.srcHopDong),
      dieuKhoan: new FormControl(cauHinhMauHopDongRawValue.dieuKhoan),
      idDonVi: new FormControl(cauHinhMauHopDongRawValue.idDonVi),
      trangThai: new FormControl(cauHinhMauHopDongRawValue.trangThai),
      ngayThaoTac: new FormControl(cauHinhMauHopDongRawValue.ngayThaoTac),
      nguoiThaoTac: new FormControl(cauHinhMauHopDongRawValue.nguoiThaoTac),
      srcLoiChung: new FormControl(cauHinhMauHopDongRawValue.srcLoiChung),
      idNhom: new FormControl(cauHinhMauHopDongRawValue.idNhom),
      fileLoiChung: new FormControl(cauHinhMauHopDongRawValue.fileLoiChung),
      chuyenTaiSan: new FormControl(cauHinhMauHopDongRawValue.chuyenTaiSan),
      loaiSuaDoi: new FormControl(cauHinhMauHopDongRawValue.loaiSuaDoi),
      loaiHuyBo: new FormControl(cauHinhMauHopDongRawValue.loaiHuyBo),
      trangThaiDuyet: new FormControl(cauHinhMauHopDongRawValue.trangThaiDuyet),
      idPhanLoaiHopDong: new FormControl(cauHinhMauHopDongRawValue.idPhanLoaiHopDong),
      srcCv: new FormControl(cauHinhMauHopDongRawValue.srcCv),
      srcTb: new FormControl(cauHinhMauHopDongRawValue.srcTb),
      srcTtpc: new FormControl(cauHinhMauHopDongRawValue.srcTtpc),
      idVaiTro3: new FormControl(cauHinhMauHopDongRawValue.idVaiTro3),
      idLoaiHD: new FormControl(cauHinhMauHopDongRawValue.idLoaiHD),
      idPhanLoaiHD: new FormControl(cauHinhMauHopDongRawValue.idPhanLoaiHD),
    });
  }

  getCauHinhMauHopDong(form: CauHinhMauHopDongFormGroup): ICauHinhMauHopDong | NewCauHinhMauHopDong {
    return form.getRawValue() as ICauHinhMauHopDong | NewCauHinhMauHopDong;
  }

  resetForm(form: CauHinhMauHopDongFormGroup, cauHinhMauHopDong: CauHinhMauHopDongFormGroupInput): void {
    const cauHinhMauHopDongRawValue = { ...this.getFormDefaults(), ...cauHinhMauHopDong };
    form.reset(
      {
        ...cauHinhMauHopDongRawValue,
        id: { value: cauHinhMauHopDongRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CauHinhMauHopDongFormDefaults {
    return {
      id: null,
    };
  }
}

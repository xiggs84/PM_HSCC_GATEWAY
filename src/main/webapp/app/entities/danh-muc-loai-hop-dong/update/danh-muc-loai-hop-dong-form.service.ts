import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDanhMucLoaiHopDong, NewDanhMucLoaiHopDong } from '../danh-muc-loai-hop-dong.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucLoaiHopDong for edit and NewDanhMucLoaiHopDongFormGroupInput for create.
 */
type DanhMucLoaiHopDongFormGroupInput = IDanhMucLoaiHopDong | PartialWithRequiredKeyOf<NewDanhMucLoaiHopDong>;

type DanhMucLoaiHopDongFormDefaults = Pick<NewDanhMucLoaiHopDong, 'id'>;

type DanhMucLoaiHopDongFormGroupContent = {
  id: FormControl<IDanhMucLoaiHopDong['id'] | NewDanhMucLoaiHopDong['id']>;
  idLoaiHd: FormControl<IDanhMucLoaiHopDong['idLoaiHd']>;
  dienGiai: FormControl<IDanhMucLoaiHopDong['dienGiai']>;
  idVaiTro1: FormControl<IDanhMucLoaiHopDong['idVaiTro1']>;
  idVaiTro2: FormControl<IDanhMucLoaiHopDong['idVaiTro2']>;
  fileHopDong: FormControl<IDanhMucLoaiHopDong['fileHopDong']>;
  srcHopDong: FormControl<IDanhMucLoaiHopDong['srcHopDong']>;
  dieuKhoan: FormControl<IDanhMucLoaiHopDong['dieuKhoan']>;
  idDonVi: FormControl<IDanhMucLoaiHopDong['idDonVi']>;
  trangThai: FormControl<IDanhMucLoaiHopDong['trangThai']>;
  ngayThaoTac: FormControl<IDanhMucLoaiHopDong['ngayThaoTac']>;
  nguoiThaoTac: FormControl<IDanhMucLoaiHopDong['nguoiThaoTac']>;
  srcLoiChung: FormControl<IDanhMucLoaiHopDong['srcLoiChung']>;
  idNhom: FormControl<IDanhMucLoaiHopDong['idNhom']>;
  fileLoiChung: FormControl<IDanhMucLoaiHopDong['fileLoiChung']>;
  chuyenTaiSan: FormControl<IDanhMucLoaiHopDong['chuyenTaiSan']>;
  loaiSuaDoi: FormControl<IDanhMucLoaiHopDong['loaiSuaDoi']>;
  loaiHuyBo: FormControl<IDanhMucLoaiHopDong['loaiHuyBo']>;
  trangThaiDuyet: FormControl<IDanhMucLoaiHopDong['trangThaiDuyet']>;
  idPhanLoaiHopDong: FormControl<IDanhMucLoaiHopDong['idPhanLoaiHopDong']>;
  srcCv: FormControl<IDanhMucLoaiHopDong['srcCv']>;
  srcTb: FormControl<IDanhMucLoaiHopDong['srcTb']>;
  srcTtpc: FormControl<IDanhMucLoaiHopDong['srcTtpc']>;
  dgTen: FormControl<IDanhMucLoaiHopDong['dgTen']>;
  nhomTen: FormControl<IDanhMucLoaiHopDong['nhomTen']>;
  idVaiTro3: FormControl<IDanhMucLoaiHopDong['idVaiTro3']>;
};

export type DanhMucLoaiHopDongFormGroup = FormGroup<DanhMucLoaiHopDongFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucLoaiHopDongFormService {
  createDanhMucLoaiHopDongFormGroup(danhMucLoaiHopDong: DanhMucLoaiHopDongFormGroupInput = { id: null }): DanhMucLoaiHopDongFormGroup {
    const danhMucLoaiHopDongRawValue = {
      ...this.getFormDefaults(),
      ...danhMucLoaiHopDong,
    };
    return new FormGroup<DanhMucLoaiHopDongFormGroupContent>({
      id: new FormControl(
        { value: danhMucLoaiHopDongRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idLoaiHd: new FormControl(danhMucLoaiHopDongRawValue.idLoaiHd),
      dienGiai: new FormControl(danhMucLoaiHopDongRawValue.dienGiai),
      idVaiTro1: new FormControl(danhMucLoaiHopDongRawValue.idVaiTro1),
      idVaiTro2: new FormControl(danhMucLoaiHopDongRawValue.idVaiTro2),
      fileHopDong: new FormControl(danhMucLoaiHopDongRawValue.fileHopDong),
      srcHopDong: new FormControl(danhMucLoaiHopDongRawValue.srcHopDong),
      dieuKhoan: new FormControl(danhMucLoaiHopDongRawValue.dieuKhoan),
      idDonVi: new FormControl(danhMucLoaiHopDongRawValue.idDonVi),
      trangThai: new FormControl(danhMucLoaiHopDongRawValue.trangThai),
      ngayThaoTac: new FormControl(danhMucLoaiHopDongRawValue.ngayThaoTac),
      nguoiThaoTac: new FormControl(danhMucLoaiHopDongRawValue.nguoiThaoTac),
      srcLoiChung: new FormControl(danhMucLoaiHopDongRawValue.srcLoiChung),
      idNhom: new FormControl(danhMucLoaiHopDongRawValue.idNhom),
      fileLoiChung: new FormControl(danhMucLoaiHopDongRawValue.fileLoiChung),
      chuyenTaiSan: new FormControl(danhMucLoaiHopDongRawValue.chuyenTaiSan),
      loaiSuaDoi: new FormControl(danhMucLoaiHopDongRawValue.loaiSuaDoi),
      loaiHuyBo: new FormControl(danhMucLoaiHopDongRawValue.loaiHuyBo),
      trangThaiDuyet: new FormControl(danhMucLoaiHopDongRawValue.trangThaiDuyet),
      idPhanLoaiHopDong: new FormControl(danhMucLoaiHopDongRawValue.idPhanLoaiHopDong),
      srcCv: new FormControl(danhMucLoaiHopDongRawValue.srcCv),
      srcTb: new FormControl(danhMucLoaiHopDongRawValue.srcTb),
      srcTtpc: new FormControl(danhMucLoaiHopDongRawValue.srcTtpc),
      dgTen: new FormControl(danhMucLoaiHopDongRawValue.dgTen),
      nhomTen: new FormControl(danhMucLoaiHopDongRawValue.nhomTen),
      idVaiTro3: new FormControl(danhMucLoaiHopDongRawValue.idVaiTro3),
    });
  }

  getDanhMucLoaiHopDong(form: DanhMucLoaiHopDongFormGroup): IDanhMucLoaiHopDong | NewDanhMucLoaiHopDong {
    return form.getRawValue() as IDanhMucLoaiHopDong | NewDanhMucLoaiHopDong;
  }

  resetForm(form: DanhMucLoaiHopDongFormGroup, danhMucLoaiHopDong: DanhMucLoaiHopDongFormGroupInput): void {
    const danhMucLoaiHopDongRawValue = { ...this.getFormDefaults(), ...danhMucLoaiHopDong };
    form.reset(
      {
        ...danhMucLoaiHopDongRawValue,
        id: { value: danhMucLoaiHopDongRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucLoaiHopDongFormDefaults {
    return {
      id: null,
    };
  }
}

import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDanhSachTaiSan, NewDanhSachTaiSan } from '../danh-sach-tai-san.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhSachTaiSan for edit and NewDanhSachTaiSanFormGroupInput for create.
 */
type DanhSachTaiSanFormGroupInput = IDanhSachTaiSan | PartialWithRequiredKeyOf<NewDanhSachTaiSan>;

type DanhSachTaiSanFormDefaults = Pick<NewDanhSachTaiSan, 'id'>;

type DanhSachTaiSanFormGroupContent = {
  id: FormControl<IDanhSachTaiSan['id'] | NewDanhSachTaiSan['id']>;
  idTaiSan: FormControl<IDanhSachTaiSan['idTaiSan']>;
  tenTaiSan: FormControl<IDanhSachTaiSan['tenTaiSan']>;
  trangThai: FormControl<IDanhSachTaiSan['trangThai']>;
  ghiChu: FormControl<IDanhSachTaiSan['ghiChu']>;
  ngayThaoTac: FormControl<IDanhSachTaiSan['ngayThaoTac']>;
  nguoiThaoTac: FormControl<IDanhSachTaiSan['nguoiThaoTac']>;
  idDuongSu: FormControl<IDanhSachTaiSan['idDuongSu']>;
  idTsGoc: FormControl<IDanhSachTaiSan['idTsGoc']>;
  maTaiSan: FormControl<IDanhSachTaiSan['maTaiSan']>;
  idTinhTrang: FormControl<IDanhSachTaiSan['idTinhTrang']>;
  idLoaiNganChan: FormControl<IDanhSachTaiSan['idLoaiNganChan']>;
  ngayBdNganChan: FormControl<IDanhSachTaiSan['ngayBdNganChan']>;
  ngayKtNganChan: FormControl<IDanhSachTaiSan['ngayKtNganChan']>;
  idMaster: FormControl<IDanhSachTaiSan['idMaster']>;
  strSearch: FormControl<IDanhSachTaiSan['strSearch']>;
  idDonVi: FormControl<IDanhSachTaiSan['idDonVi']>;
  soHsCv: FormControl<IDanhSachTaiSan['soHsCv']>;
  soCc: FormControl<IDanhSachTaiSan['soCc']>;
  soVaoSo: FormControl<IDanhSachTaiSan['soVaoSo']>;
  moTa: FormControl<IDanhSachTaiSan['moTa']>;
  loaiNganChan: FormControl<IDanhSachTaiSan['loaiNganChan']>;
  maXa: FormControl<IDanhSachTaiSan['maXa']>;
  idLoaiTs: FormControl<IDanhSachTaiSan['idLoaiTs']>;
};

export type DanhSachTaiSanFormGroup = FormGroup<DanhSachTaiSanFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhSachTaiSanFormService {
  createDanhSachTaiSanFormGroup(danhSachTaiSan: DanhSachTaiSanFormGroupInput = { id: null }): DanhSachTaiSanFormGroup {
    const danhSachTaiSanRawValue = {
      ...this.getFormDefaults(),
      ...danhSachTaiSan,
    };
    return new FormGroup<DanhSachTaiSanFormGroupContent>({
      id: new FormControl(
        { value: danhSachTaiSanRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idTaiSan: new FormControl(danhSachTaiSanRawValue.idTaiSan),
      tenTaiSan: new FormControl(danhSachTaiSanRawValue.tenTaiSan),
      trangThai: new FormControl(danhSachTaiSanRawValue.trangThai),
      ghiChu: new FormControl(danhSachTaiSanRawValue.ghiChu),
      ngayThaoTac: new FormControl(danhSachTaiSanRawValue.ngayThaoTac),
      nguoiThaoTac: new FormControl(danhSachTaiSanRawValue.nguoiThaoTac),
      idDuongSu: new FormControl(danhSachTaiSanRawValue.idDuongSu),
      idTsGoc: new FormControl(danhSachTaiSanRawValue.idTsGoc),
      maTaiSan: new FormControl(danhSachTaiSanRawValue.maTaiSan),
      idTinhTrang: new FormControl(danhSachTaiSanRawValue.idTinhTrang),
      idLoaiNganChan: new FormControl(danhSachTaiSanRawValue.idLoaiNganChan),
      ngayBdNganChan: new FormControl(danhSachTaiSanRawValue.ngayBdNganChan),
      ngayKtNganChan: new FormControl(danhSachTaiSanRawValue.ngayKtNganChan),
      idMaster: new FormControl(danhSachTaiSanRawValue.idMaster),
      strSearch: new FormControl(danhSachTaiSanRawValue.strSearch),
      idDonVi: new FormControl(danhSachTaiSanRawValue.idDonVi),
      soHsCv: new FormControl(danhSachTaiSanRawValue.soHsCv),
      soCc: new FormControl(danhSachTaiSanRawValue.soCc),
      soVaoSo: new FormControl(danhSachTaiSanRawValue.soVaoSo),
      moTa: new FormControl(danhSachTaiSanRawValue.moTa),
      loaiNganChan: new FormControl(danhSachTaiSanRawValue.loaiNganChan),
      maXa: new FormControl(danhSachTaiSanRawValue.maXa),
      idLoaiTs: new FormControl(danhSachTaiSanRawValue.idLoaiTs),
    });
  }

  getDanhSachTaiSan(form: DanhSachTaiSanFormGroup): IDanhSachTaiSan | NewDanhSachTaiSan {
    return form.getRawValue() as IDanhSachTaiSan | NewDanhSachTaiSan;
  }

  resetForm(form: DanhSachTaiSanFormGroup, danhSachTaiSan: DanhSachTaiSanFormGroupInput): void {
    const danhSachTaiSanRawValue = { ...this.getFormDefaults(), ...danhSachTaiSan };
    form.reset(
      {
        ...danhSachTaiSanRawValue,
        id: { value: danhSachTaiSanRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhSachTaiSanFormDefaults {
    return {
      id: null,
    };
  }
}

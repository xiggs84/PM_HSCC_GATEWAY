import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDanhMucDonVi, NewDanhMucDonVi } from '../danh-muc-don-vi.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucDonVi for edit and NewDanhMucDonViFormGroupInput for create.
 */
type DanhMucDonViFormGroupInput = IDanhMucDonVi | PartialWithRequiredKeyOf<NewDanhMucDonVi>;

type DanhMucDonViFormDefaults = Pick<NewDanhMucDonVi, 'id'>;

type DanhMucDonViFormGroupContent = {
  id: FormControl<IDanhMucDonVi['id'] | NewDanhMucDonVi['id']>;
  idDonVi: FormControl<IDanhMucDonVi['idDonVi']>;
  tenDonVi: FormControl<IDanhMucDonVi['tenDonVi']>;
  diaChi: FormControl<IDanhMucDonVi['diaChi']>;
  nguoiDaiDien: FormControl<IDanhMucDonVi['nguoiDaiDien']>;
  soDienThoai: FormControl<IDanhMucDonVi['soDienThoai']>;
  idDonViQl: FormControl<IDanhMucDonVi['idDonViQl']>;
  loaiDonVi: FormControl<IDanhMucDonVi['loaiDonVi']>;
  ngayKhaiBao: FormControl<IDanhMucDonVi['ngayKhaiBao']>;
  trangThai: FormControl<IDanhMucDonVi['trangThai']>;
  soNha: FormControl<IDanhMucDonVi['soNha']>;
  maSoThue: FormControl<IDanhMucDonVi['maSoThue']>;
  idCapQl: FormControl<IDanhMucDonVi['idCapQl']>;
  loaiNhiemVu: FormControl<IDanhMucDonVi['loaiNhiemVu']>;
  hoaDonDt: FormControl<IDanhMucDonVi['hoaDonDt']>;
  maDonViIgate: FormControl<IDanhMucDonVi['maDonViIgate']>;
  maCoQuanIgate: FormControl<IDanhMucDonVi['maCoQuanIgate']>;
  capDonVi: FormControl<IDanhMucDonVi['capDonVi']>;
  kySo: FormControl<IDanhMucDonVi['kySo']>;
  qrScan: FormControl<IDanhMucDonVi['qrScan']>;
  verifyIdCard: FormControl<IDanhMucDonVi['verifyIdCard']>;
  isVerifyFace: FormControl<IDanhMucDonVi['isVerifyFace']>;
  isElastic: FormControl<IDanhMucDonVi['isElastic']>;
  apikeyCccd: FormControl<IDanhMucDonVi['apikeyCccd']>;
  apikeyFace: FormControl<IDanhMucDonVi['apikeyFace']>;
  verifyCodeCccd: FormControl<IDanhMucDonVi['verifyCodeCccd']>;
  usernameElastic: FormControl<IDanhMucDonVi['usernameElastic']>;
  passwordElastic: FormControl<IDanhMucDonVi['passwordElastic']>;
  idTinh: FormControl<IDanhMucDonVi['idTinh']>;
  idHuyen: FormControl<IDanhMucDonVi['idHuyen']>;
  idPhuongXa: FormControl<IDanhMucDonVi['idPhuongXa']>;
  idLoaiDv: FormControl<IDanhMucDonVi['idLoaiDv']>;
};

export type DanhMucDonViFormGroup = FormGroup<DanhMucDonViFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucDonViFormService {
  createDanhMucDonViFormGroup(danhMucDonVi: DanhMucDonViFormGroupInput = { id: null }): DanhMucDonViFormGroup {
    const danhMucDonViRawValue = {
      ...this.getFormDefaults(),
      ...danhMucDonVi,
    };
    return new FormGroup<DanhMucDonViFormGroupContent>({
      id: new FormControl(
        { value: danhMucDonViRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idDonVi: new FormControl(danhMucDonViRawValue.idDonVi),
      tenDonVi: new FormControl(danhMucDonViRawValue.tenDonVi),
      diaChi: new FormControl(danhMucDonViRawValue.diaChi),
      nguoiDaiDien: new FormControl(danhMucDonViRawValue.nguoiDaiDien),
      soDienThoai: new FormControl(danhMucDonViRawValue.soDienThoai),
      idDonViQl: new FormControl(danhMucDonViRawValue.idDonViQl),
      loaiDonVi: new FormControl(danhMucDonViRawValue.loaiDonVi),
      ngayKhaiBao: new FormControl(danhMucDonViRawValue.ngayKhaiBao),
      trangThai: new FormControl(danhMucDonViRawValue.trangThai),
      soNha: new FormControl(danhMucDonViRawValue.soNha),
      maSoThue: new FormControl(danhMucDonViRawValue.maSoThue),
      idCapQl: new FormControl(danhMucDonViRawValue.idCapQl),
      loaiNhiemVu: new FormControl(danhMucDonViRawValue.loaiNhiemVu),
      hoaDonDt: new FormControl(danhMucDonViRawValue.hoaDonDt),
      maDonViIgate: new FormControl(danhMucDonViRawValue.maDonViIgate),
      maCoQuanIgate: new FormControl(danhMucDonViRawValue.maCoQuanIgate),
      capDonVi: new FormControl(danhMucDonViRawValue.capDonVi),
      kySo: new FormControl(danhMucDonViRawValue.kySo),
      qrScan: new FormControl(danhMucDonViRawValue.qrScan),
      verifyIdCard: new FormControl(danhMucDonViRawValue.verifyIdCard),
      isVerifyFace: new FormControl(danhMucDonViRawValue.isVerifyFace),
      isElastic: new FormControl(danhMucDonViRawValue.isElastic),
      apikeyCccd: new FormControl(danhMucDonViRawValue.apikeyCccd),
      apikeyFace: new FormControl(danhMucDonViRawValue.apikeyFace),
      verifyCodeCccd: new FormControl(danhMucDonViRawValue.verifyCodeCccd),
      usernameElastic: new FormControl(danhMucDonViRawValue.usernameElastic),
      passwordElastic: new FormControl(danhMucDonViRawValue.passwordElastic),
      idTinh: new FormControl(danhMucDonViRawValue.idTinh),
      idHuyen: new FormControl(danhMucDonViRawValue.idHuyen),
      idPhuongXa: new FormControl(danhMucDonViRawValue.idPhuongXa),
      idLoaiDv: new FormControl(danhMucDonViRawValue.idLoaiDv),
    });
  }

  getDanhMucDonVi(form: DanhMucDonViFormGroup): IDanhMucDonVi | NewDanhMucDonVi {
    return form.getRawValue() as IDanhMucDonVi | NewDanhMucDonVi;
  }

  resetForm(form: DanhMucDonViFormGroup, danhMucDonVi: DanhMucDonViFormGroupInput): void {
    const danhMucDonViRawValue = { ...this.getFormDefaults(), ...danhMucDonVi };
    form.reset(
      {
        ...danhMucDonViRawValue,
        id: { value: danhMucDonViRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucDonViFormDefaults {
    return {
      id: null,
    };
  }
}

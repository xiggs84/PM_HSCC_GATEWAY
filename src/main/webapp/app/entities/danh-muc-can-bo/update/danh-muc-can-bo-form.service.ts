import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDanhMucCanBo, NewDanhMucCanBo } from '../danh-muc-can-bo.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucCanBo for edit and NewDanhMucCanBoFormGroupInput for create.
 */
type DanhMucCanBoFormGroupInput = IDanhMucCanBo | PartialWithRequiredKeyOf<NewDanhMucCanBo>;

type DanhMucCanBoFormDefaults = Pick<NewDanhMucCanBo, 'id'>;

type DanhMucCanBoFormGroupContent = {
  id: FormControl<IDanhMucCanBo['id'] | NewDanhMucCanBo['id']>;
  idCanBo: FormControl<IDanhMucCanBo['idCanBo']>;
  tenCanBo: FormControl<IDanhMucCanBo['tenCanBo']>;
  diaChi: FormControl<IDanhMucCanBo['diaChi']>;
  namSinh: FormControl<IDanhMucCanBo['namSinh']>;
  email: FormControl<IDanhMucCanBo['email']>;
  soDienThoai: FormControl<IDanhMucCanBo['soDienThoai']>;
  soCmnd: FormControl<IDanhMucCanBo['soCmnd']>;
  tenDangNhap: FormControl<IDanhMucCanBo['tenDangNhap']>;
  matKhau: FormControl<IDanhMucCanBo['matKhau']>;
  trangThai: FormControl<IDanhMucCanBo['trangThai']>;
  clientId: FormControl<IDanhMucCanBo['clientId']>;
  clientSecret: FormControl<IDanhMucCanBo['clientSecret']>;
  usernameKyso: FormControl<IDanhMucCanBo['usernameKyso']>;
  passwordKyso: FormControl<IDanhMucCanBo['passwordKyso']>;
};

export type DanhMucCanBoFormGroup = FormGroup<DanhMucCanBoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucCanBoFormService {
  createDanhMucCanBoFormGroup(danhMucCanBo: DanhMucCanBoFormGroupInput = { id: null }): DanhMucCanBoFormGroup {
    const danhMucCanBoRawValue = {
      ...this.getFormDefaults(),
      ...danhMucCanBo,
    };
    return new FormGroup<DanhMucCanBoFormGroupContent>({
      id: new FormControl(
        { value: danhMucCanBoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idCanBo: new FormControl(danhMucCanBoRawValue.idCanBo),
      tenCanBo: new FormControl(danhMucCanBoRawValue.tenCanBo),
      diaChi: new FormControl(danhMucCanBoRawValue.diaChi),
      namSinh: new FormControl(danhMucCanBoRawValue.namSinh),
      email: new FormControl(danhMucCanBoRawValue.email),
      soDienThoai: new FormControl(danhMucCanBoRawValue.soDienThoai),
      soCmnd: new FormControl(danhMucCanBoRawValue.soCmnd),
      tenDangNhap: new FormControl(danhMucCanBoRawValue.tenDangNhap),
      matKhau: new FormControl(danhMucCanBoRawValue.matKhau),
      trangThai: new FormControl(danhMucCanBoRawValue.trangThai),
      clientId: new FormControl(danhMucCanBoRawValue.clientId),
      clientSecret: new FormControl(danhMucCanBoRawValue.clientSecret),
      usernameKyso: new FormControl(danhMucCanBoRawValue.usernameKyso),
      passwordKyso: new FormControl(danhMucCanBoRawValue.passwordKyso),
    });
  }

  getDanhMucCanBo(form: DanhMucCanBoFormGroup): IDanhMucCanBo | NewDanhMucCanBo {
    return form.getRawValue() as IDanhMucCanBo | NewDanhMucCanBo;
  }

  resetForm(form: DanhMucCanBoFormGroup, danhMucCanBo: DanhMucCanBoFormGroupInput): void {
    const danhMucCanBoRawValue = { ...this.getFormDefaults(), ...danhMucCanBo };
    form.reset(
      {
        ...danhMucCanBoRawValue,
        id: { value: danhMucCanBoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucCanBoFormDefaults {
    return {
      id: null,
    };
  }
}

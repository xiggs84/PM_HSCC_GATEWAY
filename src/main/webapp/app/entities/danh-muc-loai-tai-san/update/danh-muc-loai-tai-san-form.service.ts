import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDanhMucLoaiTaiSan, NewDanhMucLoaiTaiSan } from '../danh-muc-loai-tai-san.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucLoaiTaiSan for edit and NewDanhMucLoaiTaiSanFormGroupInput for create.
 */
type DanhMucLoaiTaiSanFormGroupInput = IDanhMucLoaiTaiSan | PartialWithRequiredKeyOf<NewDanhMucLoaiTaiSan>;

type DanhMucLoaiTaiSanFormDefaults = Pick<NewDanhMucLoaiTaiSan, 'id'>;

type DanhMucLoaiTaiSanFormGroupContent = {
  id: FormControl<IDanhMucLoaiTaiSan['id'] | NewDanhMucLoaiTaiSan['id']>;
  idLoaiTs: FormControl<IDanhMucLoaiTaiSan['idLoaiTs']>;
  dienGiai: FormControl<IDanhMucLoaiTaiSan['dienGiai']>;
  trangThai: FormControl<IDanhMucLoaiTaiSan['trangThai']>;
  searchStr: FormControl<IDanhMucLoaiTaiSan['searchStr']>;
};

export type DanhMucLoaiTaiSanFormGroup = FormGroup<DanhMucLoaiTaiSanFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucLoaiTaiSanFormService {
  createDanhMucLoaiTaiSanFormGroup(danhMucLoaiTaiSan: DanhMucLoaiTaiSanFormGroupInput = { id: null }): DanhMucLoaiTaiSanFormGroup {
    const danhMucLoaiTaiSanRawValue = {
      ...this.getFormDefaults(),
      ...danhMucLoaiTaiSan,
    };
    return new FormGroup<DanhMucLoaiTaiSanFormGroupContent>({
      id: new FormControl(
        { value: danhMucLoaiTaiSanRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idLoaiTs: new FormControl(danhMucLoaiTaiSanRawValue.idLoaiTs),
      dienGiai: new FormControl(danhMucLoaiTaiSanRawValue.dienGiai),
      trangThai: new FormControl(danhMucLoaiTaiSanRawValue.trangThai),
      searchStr: new FormControl(danhMucLoaiTaiSanRawValue.searchStr),
    });
  }

  getDanhMucLoaiTaiSan(form: DanhMucLoaiTaiSanFormGroup): IDanhMucLoaiTaiSan | NewDanhMucLoaiTaiSan {
    return form.getRawValue() as IDanhMucLoaiTaiSan | NewDanhMucLoaiTaiSan;
  }

  resetForm(form: DanhMucLoaiTaiSanFormGroup, danhMucLoaiTaiSan: DanhMucLoaiTaiSanFormGroupInput): void {
    const danhMucLoaiTaiSanRawValue = { ...this.getFormDefaults(), ...danhMucLoaiTaiSan };
    form.reset(
      {
        ...danhMucLoaiTaiSanRawValue,
        id: { value: danhMucLoaiTaiSanRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucLoaiTaiSanFormDefaults {
    return {
      id: null,
    };
  }
}

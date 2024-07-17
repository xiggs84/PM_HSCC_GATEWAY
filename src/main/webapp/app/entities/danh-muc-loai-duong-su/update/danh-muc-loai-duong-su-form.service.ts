import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDanhMucLoaiDuongSu, NewDanhMucLoaiDuongSu } from '../danh-muc-loai-duong-su.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucLoaiDuongSu for edit and NewDanhMucLoaiDuongSuFormGroupInput for create.
 */
type DanhMucLoaiDuongSuFormGroupInput = IDanhMucLoaiDuongSu | PartialWithRequiredKeyOf<NewDanhMucLoaiDuongSu>;

type DanhMucLoaiDuongSuFormDefaults = Pick<NewDanhMucLoaiDuongSu, 'id'>;

type DanhMucLoaiDuongSuFormGroupContent = {
  id: FormControl<IDanhMucLoaiDuongSu['id'] | NewDanhMucLoaiDuongSu['id']>;
  idLoaiDs: FormControl<IDanhMucLoaiDuongSu['idLoaiDs']>;
  dienGiai: FormControl<IDanhMucLoaiDuongSu['dienGiai']>;
  trangThai: FormControl<IDanhMucLoaiDuongSu['trangThai']>;
  strSearch: FormControl<IDanhMucLoaiDuongSu['strSearch']>;
};

export type DanhMucLoaiDuongSuFormGroup = FormGroup<DanhMucLoaiDuongSuFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucLoaiDuongSuFormService {
  createDanhMucLoaiDuongSuFormGroup(danhMucLoaiDuongSu: DanhMucLoaiDuongSuFormGroupInput = { id: null }): DanhMucLoaiDuongSuFormGroup {
    const danhMucLoaiDuongSuRawValue = {
      ...this.getFormDefaults(),
      ...danhMucLoaiDuongSu,
    };
    return new FormGroup<DanhMucLoaiDuongSuFormGroupContent>({
      id: new FormControl(
        { value: danhMucLoaiDuongSuRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idLoaiDs: new FormControl(danhMucLoaiDuongSuRawValue.idLoaiDs),
      dienGiai: new FormControl(danhMucLoaiDuongSuRawValue.dienGiai),
      trangThai: new FormControl(danhMucLoaiDuongSuRawValue.trangThai),
      strSearch: new FormControl(danhMucLoaiDuongSuRawValue.strSearch),
    });
  }

  getDanhMucLoaiDuongSu(form: DanhMucLoaiDuongSuFormGroup): IDanhMucLoaiDuongSu | NewDanhMucLoaiDuongSu {
    return form.getRawValue() as IDanhMucLoaiDuongSu | NewDanhMucLoaiDuongSu;
  }

  resetForm(form: DanhMucLoaiDuongSuFormGroup, danhMucLoaiDuongSu: DanhMucLoaiDuongSuFormGroupInput): void {
    const danhMucLoaiDuongSuRawValue = { ...this.getFormDefaults(), ...danhMucLoaiDuongSu };
    form.reset(
      {
        ...danhMucLoaiDuongSuRawValue,
        id: { value: danhMucLoaiDuongSuRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucLoaiDuongSuFormDefaults {
    return {
      id: null,
    };
  }
}

import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDanhMucLoaiSoCongChung, NewDanhMucLoaiSoCongChung } from '../danh-muc-loai-so-cong-chung.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucLoaiSoCongChung for edit and NewDanhMucLoaiSoCongChungFormGroupInput for create.
 */
type DanhMucLoaiSoCongChungFormGroupInput = IDanhMucLoaiSoCongChung | PartialWithRequiredKeyOf<NewDanhMucLoaiSoCongChung>;

type DanhMucLoaiSoCongChungFormDefaults = Pick<NewDanhMucLoaiSoCongChung, 'id'>;

type DanhMucLoaiSoCongChungFormGroupContent = {
  id: FormControl<IDanhMucLoaiSoCongChung['id'] | NewDanhMucLoaiSoCongChung['id']>;
  idLoai: FormControl<IDanhMucLoaiSoCongChung['idLoai']>;
  tenLoai: FormControl<IDanhMucLoaiSoCongChung['tenLoai']>;
  trangThai: FormControl<IDanhMucLoaiSoCongChung['trangThai']>;
};

export type DanhMucLoaiSoCongChungFormGroup = FormGroup<DanhMucLoaiSoCongChungFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucLoaiSoCongChungFormService {
  createDanhMucLoaiSoCongChungFormGroup(
    danhMucLoaiSoCongChung: DanhMucLoaiSoCongChungFormGroupInput = { id: null },
  ): DanhMucLoaiSoCongChungFormGroup {
    const danhMucLoaiSoCongChungRawValue = {
      ...this.getFormDefaults(),
      ...danhMucLoaiSoCongChung,
    };
    return new FormGroup<DanhMucLoaiSoCongChungFormGroupContent>({
      id: new FormControl(
        { value: danhMucLoaiSoCongChungRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idLoai: new FormControl(danhMucLoaiSoCongChungRawValue.idLoai),
      tenLoai: new FormControl(danhMucLoaiSoCongChungRawValue.tenLoai),
      trangThai: new FormControl(danhMucLoaiSoCongChungRawValue.trangThai),
    });
  }

  getDanhMucLoaiSoCongChung(form: DanhMucLoaiSoCongChungFormGroup): IDanhMucLoaiSoCongChung | NewDanhMucLoaiSoCongChung {
    return form.getRawValue() as IDanhMucLoaiSoCongChung | NewDanhMucLoaiSoCongChung;
  }

  resetForm(form: DanhMucLoaiSoCongChungFormGroup, danhMucLoaiSoCongChung: DanhMucLoaiSoCongChungFormGroupInput): void {
    const danhMucLoaiSoCongChungRawValue = { ...this.getFormDefaults(), ...danhMucLoaiSoCongChung };
    form.reset(
      {
        ...danhMucLoaiSoCongChungRawValue,
        id: { value: danhMucLoaiSoCongChungRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucLoaiSoCongChungFormDefaults {
    return {
      id: null,
    };
  }
}

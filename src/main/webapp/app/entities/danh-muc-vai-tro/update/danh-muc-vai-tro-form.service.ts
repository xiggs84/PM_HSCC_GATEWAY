import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDanhMucVaiTro, NewDanhMucVaiTro } from '../danh-muc-vai-tro.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucVaiTro for edit and NewDanhMucVaiTroFormGroupInput for create.
 */
type DanhMucVaiTroFormGroupInput = IDanhMucVaiTro | PartialWithRequiredKeyOf<NewDanhMucVaiTro>;

type DanhMucVaiTroFormDefaults = Pick<NewDanhMucVaiTro, 'id'>;

type DanhMucVaiTroFormGroupContent = {
  id: FormControl<IDanhMucVaiTro['id'] | NewDanhMucVaiTro['id']>;
  idVaiTro: FormControl<IDanhMucVaiTro['idVaiTro']>;
  dienGiai: FormControl<IDanhMucVaiTro['dienGiai']>;
  idLoaiHopDong: FormControl<IDanhMucVaiTro['idLoaiHopDong']>;
  idLoaiVaiTro: FormControl<IDanhMucVaiTro['idLoaiVaiTro']>;
};

export type DanhMucVaiTroFormGroup = FormGroup<DanhMucVaiTroFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucVaiTroFormService {
  createDanhMucVaiTroFormGroup(danhMucVaiTro: DanhMucVaiTroFormGroupInput = { id: null }): DanhMucVaiTroFormGroup {
    const danhMucVaiTroRawValue = {
      ...this.getFormDefaults(),
      ...danhMucVaiTro,
    };
    return new FormGroup<DanhMucVaiTroFormGroupContent>({
      id: new FormControl(
        { value: danhMucVaiTroRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idVaiTro: new FormControl(danhMucVaiTroRawValue.idVaiTro),
      dienGiai: new FormControl(danhMucVaiTroRawValue.dienGiai),
      idLoaiHopDong: new FormControl(danhMucVaiTroRawValue.idLoaiHopDong),
      idLoaiVaiTro: new FormControl(danhMucVaiTroRawValue.idLoaiVaiTro),
    });
  }

  getDanhMucVaiTro(form: DanhMucVaiTroFormGroup): IDanhMucVaiTro | NewDanhMucVaiTro {
    return form.getRawValue() as IDanhMucVaiTro | NewDanhMucVaiTro;
  }

  resetForm(form: DanhMucVaiTroFormGroup, danhMucVaiTro: DanhMucVaiTroFormGroupInput): void {
    const danhMucVaiTroRawValue = { ...this.getFormDefaults(), ...danhMucVaiTro };
    form.reset(
      {
        ...danhMucVaiTroRawValue,
        id: { value: danhMucVaiTroRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucVaiTroFormDefaults {
    return {
      id: null,
    };
  }
}

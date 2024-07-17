import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILoaiHopDongCongChung, NewLoaiHopDongCongChung } from '../loai-hop-dong-cong-chung.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILoaiHopDongCongChung for edit and NewLoaiHopDongCongChungFormGroupInput for create.
 */
type LoaiHopDongCongChungFormGroupInput = ILoaiHopDongCongChung | PartialWithRequiredKeyOf<NewLoaiHopDongCongChung>;

type LoaiHopDongCongChungFormDefaults = Pick<NewLoaiHopDongCongChung, 'id'>;

type LoaiHopDongCongChungFormGroupContent = {
  id: FormControl<ILoaiHopDongCongChung['id'] | NewLoaiHopDongCongChung['id']>;
  idLoaiHopDongCongChung: FormControl<ILoaiHopDongCongChung['idLoaiHopDongCongChung']>;
  dienGiai: FormControl<ILoaiHopDongCongChung['dienGiai']>;
  giaTri: FormControl<ILoaiHopDongCongChung['giaTri']>;
  trangThai: FormControl<ILoaiHopDongCongChung['trangThai']>;
};

export type LoaiHopDongCongChungFormGroup = FormGroup<LoaiHopDongCongChungFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LoaiHopDongCongChungFormService {
  createLoaiHopDongCongChungFormGroup(
    loaiHopDongCongChung: LoaiHopDongCongChungFormGroupInput = { id: null },
  ): LoaiHopDongCongChungFormGroup {
    const loaiHopDongCongChungRawValue = {
      ...this.getFormDefaults(),
      ...loaiHopDongCongChung,
    };
    return new FormGroup<LoaiHopDongCongChungFormGroupContent>({
      id: new FormControl(
        { value: loaiHopDongCongChungRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idLoaiHopDongCongChung: new FormControl(loaiHopDongCongChungRawValue.idLoaiHopDongCongChung),
      dienGiai: new FormControl(loaiHopDongCongChungRawValue.dienGiai),
      giaTri: new FormControl(loaiHopDongCongChungRawValue.giaTri),
      trangThai: new FormControl(loaiHopDongCongChungRawValue.trangThai),
    });
  }

  getLoaiHopDongCongChung(form: LoaiHopDongCongChungFormGroup): ILoaiHopDongCongChung | NewLoaiHopDongCongChung {
    return form.getRawValue() as ILoaiHopDongCongChung | NewLoaiHopDongCongChung;
  }

  resetForm(form: LoaiHopDongCongChungFormGroup, loaiHopDongCongChung: LoaiHopDongCongChungFormGroupInput): void {
    const loaiHopDongCongChungRawValue = { ...this.getFormDefaults(), ...loaiHopDongCongChung };
    form.reset(
      {
        ...loaiHopDongCongChungRawValue,
        id: { value: loaiHopDongCongChungRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): LoaiHopDongCongChungFormDefaults {
    return {
      id: null,
    };
  }
}

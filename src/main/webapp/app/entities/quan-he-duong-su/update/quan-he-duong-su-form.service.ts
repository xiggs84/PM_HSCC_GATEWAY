import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IQuanHeDuongSu, NewQuanHeDuongSu } from '../quan-he-duong-su.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IQuanHeDuongSu for edit and NewQuanHeDuongSuFormGroupInput for create.
 */
type QuanHeDuongSuFormGroupInput = IQuanHeDuongSu | PartialWithRequiredKeyOf<NewQuanHeDuongSu>;

type QuanHeDuongSuFormDefaults = Pick<NewQuanHeDuongSu, 'id'>;

type QuanHeDuongSuFormGroupContent = {
  id: FormControl<IQuanHeDuongSu['id'] | NewQuanHeDuongSu['id']>;
  idDuongSu: FormControl<IQuanHeDuongSu['idDuongSu']>;
  idDuongSuQh: FormControl<IQuanHeDuongSu['idDuongSuQh']>;
  idQuanHe: FormControl<IQuanHeDuongSu['idQuanHe']>;
  thongTinQuanHe: FormControl<IQuanHeDuongSu['thongTinQuanHe']>;
  trangThai: FormControl<IQuanHeDuongSu['trangThai']>;
};

export type QuanHeDuongSuFormGroup = FormGroup<QuanHeDuongSuFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class QuanHeDuongSuFormService {
  createQuanHeDuongSuFormGroup(quanHeDuongSu: QuanHeDuongSuFormGroupInput = { id: null }): QuanHeDuongSuFormGroup {
    const quanHeDuongSuRawValue = {
      ...this.getFormDefaults(),
      ...quanHeDuongSu,
    };
    return new FormGroup<QuanHeDuongSuFormGroupContent>({
      id: new FormControl(
        { value: quanHeDuongSuRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idDuongSu: new FormControl(quanHeDuongSuRawValue.idDuongSu),
      idDuongSuQh: new FormControl(quanHeDuongSuRawValue.idDuongSuQh),
      idQuanHe: new FormControl(quanHeDuongSuRawValue.idQuanHe),
      thongTinQuanHe: new FormControl(quanHeDuongSuRawValue.thongTinQuanHe),
      trangThai: new FormControl(quanHeDuongSuRawValue.trangThai),
    });
  }

  getQuanHeDuongSu(form: QuanHeDuongSuFormGroup): IQuanHeDuongSu | NewQuanHeDuongSu {
    return form.getRawValue() as IQuanHeDuongSu | NewQuanHeDuongSu;
  }

  resetForm(form: QuanHeDuongSuFormGroup, quanHeDuongSu: QuanHeDuongSuFormGroupInput): void {
    const quanHeDuongSuRawValue = { ...this.getFormDefaults(), ...quanHeDuongSu };
    form.reset(
      {
        ...quanHeDuongSuRawValue,
        id: { value: quanHeDuongSuRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): QuanHeDuongSuFormDefaults {
    return {
      id: null,
    };
  }
}

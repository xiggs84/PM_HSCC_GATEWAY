import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITaisanSaiDgc, NewTaisanSaiDgc } from '../taisan-sai-dgc.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITaisanSaiDgc for edit and NewTaisanSaiDgcFormGroupInput for create.
 */
type TaisanSaiDgcFormGroupInput = ITaisanSaiDgc | PartialWithRequiredKeyOf<NewTaisanSaiDgc>;

type TaisanSaiDgcFormDefaults = Pick<NewTaisanSaiDgc, 'id'>;

type TaisanSaiDgcFormGroupContent = {
  id: FormControl<ITaisanSaiDgc['id'] | NewTaisanSaiDgc['id']>;
  idMaster: FormControl<ITaisanSaiDgc['idMaster']>;
  thongTinTs: FormControl<ITaisanSaiDgc['thongTinTs']>;
  thongTinTsDung: FormControl<ITaisanSaiDgc['thongTinTsDung']>;
};

export type TaisanSaiDgcFormGroup = FormGroup<TaisanSaiDgcFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TaisanSaiDgcFormService {
  createTaisanSaiDgcFormGroup(taisanSaiDgc: TaisanSaiDgcFormGroupInput = { id: null }): TaisanSaiDgcFormGroup {
    const taisanSaiDgcRawValue = {
      ...this.getFormDefaults(),
      ...taisanSaiDgc,
    };
    return new FormGroup<TaisanSaiDgcFormGroupContent>({
      id: new FormControl(
        { value: taisanSaiDgcRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idMaster: new FormControl(taisanSaiDgcRawValue.idMaster),
      thongTinTs: new FormControl(taisanSaiDgcRawValue.thongTinTs),
      thongTinTsDung: new FormControl(taisanSaiDgcRawValue.thongTinTsDung),
    });
  }

  getTaisanSaiDgc(form: TaisanSaiDgcFormGroup): ITaisanSaiDgc | NewTaisanSaiDgc {
    return form.getRawValue() as ITaisanSaiDgc | NewTaisanSaiDgc;
  }

  resetForm(form: TaisanSaiDgcFormGroup, taisanSaiDgc: TaisanSaiDgcFormGroupInput): void {
    const taisanSaiDgcRawValue = { ...this.getFormDefaults(), ...taisanSaiDgc };
    form.reset(
      {
        ...taisanSaiDgcRawValue,
        id: { value: taisanSaiDgcRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TaisanSaiDgcFormDefaults {
    return {
      id: null,
    };
  }
}

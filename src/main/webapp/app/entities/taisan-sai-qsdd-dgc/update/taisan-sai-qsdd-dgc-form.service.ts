import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITaisanSaiQsddDgc, NewTaisanSaiQsddDgc } from '../taisan-sai-qsdd-dgc.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITaisanSaiQsddDgc for edit and NewTaisanSaiQsddDgcFormGroupInput for create.
 */
type TaisanSaiQsddDgcFormGroupInput = ITaisanSaiQsddDgc | PartialWithRequiredKeyOf<NewTaisanSaiQsddDgc>;

type TaisanSaiQsddDgcFormDefaults = Pick<NewTaisanSaiQsddDgc, 'id'>;

type TaisanSaiQsddDgcFormGroupContent = {
  id: FormControl<ITaisanSaiQsddDgc['id'] | NewTaisanSaiQsddDgc['id']>;
  idMaster: FormControl<ITaisanSaiQsddDgc['idMaster']>;
  noiCapQsdd: FormControl<ITaisanSaiQsddDgc['noiCapQsdd']>;
};

export type TaisanSaiQsddDgcFormGroup = FormGroup<TaisanSaiQsddDgcFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TaisanSaiQsddDgcFormService {
  createTaisanSaiQsddDgcFormGroup(taisanSaiQsddDgc: TaisanSaiQsddDgcFormGroupInput = { id: null }): TaisanSaiQsddDgcFormGroup {
    const taisanSaiQsddDgcRawValue = {
      ...this.getFormDefaults(),
      ...taisanSaiQsddDgc,
    };
    return new FormGroup<TaisanSaiQsddDgcFormGroupContent>({
      id: new FormControl(
        { value: taisanSaiQsddDgcRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idMaster: new FormControl(taisanSaiQsddDgcRawValue.idMaster),
      noiCapQsdd: new FormControl(taisanSaiQsddDgcRawValue.noiCapQsdd),
    });
  }

  getTaisanSaiQsddDgc(form: TaisanSaiQsddDgcFormGroup): ITaisanSaiQsddDgc | NewTaisanSaiQsddDgc {
    return form.getRawValue() as ITaisanSaiQsddDgc | NewTaisanSaiQsddDgc;
  }

  resetForm(form: TaisanSaiQsddDgcFormGroup, taisanSaiQsddDgc: TaisanSaiQsddDgcFormGroupInput): void {
    const taisanSaiQsddDgcRawValue = { ...this.getFormDefaults(), ...taisanSaiQsddDgc };
    form.reset(
      {
        ...taisanSaiQsddDgcRawValue,
        id: { value: taisanSaiQsddDgcRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TaisanSaiQsddDgcFormDefaults {
    return {
      id: null,
    };
  }
}

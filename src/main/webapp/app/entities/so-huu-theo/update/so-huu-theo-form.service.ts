import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISoHuuTheo, NewSoHuuTheo } from '../so-huu-theo.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISoHuuTheo for edit and NewSoHuuTheoFormGroupInput for create.
 */
type SoHuuTheoFormGroupInput = ISoHuuTheo | PartialWithRequiredKeyOf<NewSoHuuTheo>;

type SoHuuTheoFormDefaults = Pick<NewSoHuuTheo, 'id'>;

type SoHuuTheoFormGroupContent = {
  id: FormControl<ISoHuuTheo['id'] | NewSoHuuTheo['id']>;
  idSoHuu: FormControl<ISoHuuTheo['idSoHuu']>;
  dienGiai: FormControl<ISoHuuTheo['dienGiai']>;
  tenGcn: FormControl<ISoHuuTheo['tenGcn']>;
};

export type SoHuuTheoFormGroup = FormGroup<SoHuuTheoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SoHuuTheoFormService {
  createSoHuuTheoFormGroup(soHuuTheo: SoHuuTheoFormGroupInput = { id: null }): SoHuuTheoFormGroup {
    const soHuuTheoRawValue = {
      ...this.getFormDefaults(),
      ...soHuuTheo,
    };
    return new FormGroup<SoHuuTheoFormGroupContent>({
      id: new FormControl(
        { value: soHuuTheoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idSoHuu: new FormControl(soHuuTheoRawValue.idSoHuu),
      dienGiai: new FormControl(soHuuTheoRawValue.dienGiai),
      tenGcn: new FormControl(soHuuTheoRawValue.tenGcn),
    });
  }

  getSoHuuTheo(form: SoHuuTheoFormGroup): ISoHuuTheo | NewSoHuuTheo {
    return form.getRawValue() as ISoHuuTheo | NewSoHuuTheo;
  }

  resetForm(form: SoHuuTheoFormGroup, soHuuTheo: SoHuuTheoFormGroupInput): void {
    const soHuuTheoRawValue = { ...this.getFormDefaults(), ...soHuuTheo };
    form.reset(
      {
        ...soHuuTheoRawValue,
        id: { value: soHuuTheoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): SoHuuTheoFormDefaults {
    return {
      id: null,
    };
  }
}

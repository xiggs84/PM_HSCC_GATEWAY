import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISoLanHoiFaq, NewSoLanHoiFaq } from '../so-lan-hoi-faq.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISoLanHoiFaq for edit and NewSoLanHoiFaqFormGroupInput for create.
 */
type SoLanHoiFaqFormGroupInput = ISoLanHoiFaq | PartialWithRequiredKeyOf<NewSoLanHoiFaq>;

type SoLanHoiFaqFormDefaults = Pick<NewSoLanHoiFaq, 'id'>;

type SoLanHoiFaqFormGroupContent = {
  id: FormControl<ISoLanHoiFaq['id'] | NewSoLanHoiFaq['id']>;
  idCauHoi: FormControl<ISoLanHoiFaq['idCauHoi']>;
  idCanBo: FormControl<ISoLanHoiFaq['idCanBo']>;
  ngayThaoTac: FormControl<ISoLanHoiFaq['ngayThaoTac']>;
};

export type SoLanHoiFaqFormGroup = FormGroup<SoLanHoiFaqFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SoLanHoiFaqFormService {
  createSoLanHoiFaqFormGroup(soLanHoiFaq: SoLanHoiFaqFormGroupInput = { id: null }): SoLanHoiFaqFormGroup {
    const soLanHoiFaqRawValue = {
      ...this.getFormDefaults(),
      ...soLanHoiFaq,
    };
    return new FormGroup<SoLanHoiFaqFormGroupContent>({
      id: new FormControl(
        { value: soLanHoiFaqRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idCauHoi: new FormControl(soLanHoiFaqRawValue.idCauHoi),
      idCanBo: new FormControl(soLanHoiFaqRawValue.idCanBo),
      ngayThaoTac: new FormControl(soLanHoiFaqRawValue.ngayThaoTac),
    });
  }

  getSoLanHoiFaq(form: SoLanHoiFaqFormGroup): ISoLanHoiFaq | NewSoLanHoiFaq {
    return form.getRawValue() as ISoLanHoiFaq | NewSoLanHoiFaq;
  }

  resetForm(form: SoLanHoiFaqFormGroup, soLanHoiFaq: SoLanHoiFaqFormGroupInput): void {
    const soLanHoiFaqRawValue = { ...this.getFormDefaults(), ...soLanHoiFaq };
    form.reset(
      {
        ...soLanHoiFaqRawValue,
        id: { value: soLanHoiFaqRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): SoLanHoiFaqFormDefaults {
    return {
      id: null,
    };
  }
}

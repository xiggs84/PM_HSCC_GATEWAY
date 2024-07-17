import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IHdMasterCoCcv, NewHdMasterCoCcv } from '../hd-master-co-ccv.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IHdMasterCoCcv for edit and NewHdMasterCoCcvFormGroupInput for create.
 */
type HdMasterCoCcvFormGroupInput = IHdMasterCoCcv | PartialWithRequiredKeyOf<NewHdMasterCoCcv>;

type HdMasterCoCcvFormDefaults = Pick<NewHdMasterCoCcv, 'id'>;

type HdMasterCoCcvFormGroupContent = {
  id: FormControl<IHdMasterCoCcv['id'] | NewHdMasterCoCcv['id']>;
  repRefUnique: FormControl<IHdMasterCoCcv['repRefUnique']>;
  persCode: FormControl<IHdMasterCoCcv['persCode']>;
  ldUnique: FormControl<IHdMasterCoCcv['ldUnique']>;
  tenCanBo: FormControl<IHdMasterCoCcv['tenCanBo']>;
  idCanBo: FormControl<IHdMasterCoCcv['idCanBo']>;
};

export type HdMasterCoCcvFormGroup = FormGroup<HdMasterCoCcvFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class HdMasterCoCcvFormService {
  createHdMasterCoCcvFormGroup(hdMasterCoCcv: HdMasterCoCcvFormGroupInput = { id: null }): HdMasterCoCcvFormGroup {
    const hdMasterCoCcvRawValue = {
      ...this.getFormDefaults(),
      ...hdMasterCoCcv,
    };
    return new FormGroup<HdMasterCoCcvFormGroupContent>({
      id: new FormControl(
        { value: hdMasterCoCcvRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      repRefUnique: new FormControl(hdMasterCoCcvRawValue.repRefUnique),
      persCode: new FormControl(hdMasterCoCcvRawValue.persCode),
      ldUnique: new FormControl(hdMasterCoCcvRawValue.ldUnique),
      tenCanBo: new FormControl(hdMasterCoCcvRawValue.tenCanBo),
      idCanBo: new FormControl(hdMasterCoCcvRawValue.idCanBo),
    });
  }

  getHdMasterCoCcv(form: HdMasterCoCcvFormGroup): IHdMasterCoCcv | NewHdMasterCoCcv {
    return form.getRawValue() as IHdMasterCoCcv | NewHdMasterCoCcv;
  }

  resetForm(form: HdMasterCoCcvFormGroup, hdMasterCoCcv: HdMasterCoCcvFormGroupInput): void {
    const hdMasterCoCcvRawValue = { ...this.getFormDefaults(), ...hdMasterCoCcv };
    form.reset(
      {
        ...hdMasterCoCcvRawValue,
        id: { value: hdMasterCoCcvRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): HdMasterCoCcvFormDefaults {
    return {
      id: null,
    };
  }
}

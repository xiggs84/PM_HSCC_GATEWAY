import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IHdMasterTcCoCcv, NewHdMasterTcCoCcv } from '../hd-master-tc-co-ccv.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IHdMasterTcCoCcv for edit and NewHdMasterTcCoCcvFormGroupInput for create.
 */
type HdMasterTcCoCcvFormGroupInput = IHdMasterTcCoCcv | PartialWithRequiredKeyOf<NewHdMasterTcCoCcv>;

type HdMasterTcCoCcvFormDefaults = Pick<NewHdMasterTcCoCcv, 'id'>;

type HdMasterTcCoCcvFormGroupContent = {
  id: FormControl<IHdMasterTcCoCcv['id'] | NewHdMasterTcCoCcv['id']>;
  repRefUnique: FormControl<IHdMasterTcCoCcv['repRefUnique']>;
  persCode: FormControl<IHdMasterTcCoCcv['persCode']>;
  tenCanBo: FormControl<IHdMasterTcCoCcv['tenCanBo']>;
  idCanBo: FormControl<IHdMasterTcCoCcv['idCanBo']>;
};

export type HdMasterTcCoCcvFormGroup = FormGroup<HdMasterTcCoCcvFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class HdMasterTcCoCcvFormService {
  createHdMasterTcCoCcvFormGroup(hdMasterTcCoCcv: HdMasterTcCoCcvFormGroupInput = { id: null }): HdMasterTcCoCcvFormGroup {
    const hdMasterTcCoCcvRawValue = {
      ...this.getFormDefaults(),
      ...hdMasterTcCoCcv,
    };
    return new FormGroup<HdMasterTcCoCcvFormGroupContent>({
      id: new FormControl(
        { value: hdMasterTcCoCcvRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      repRefUnique: new FormControl(hdMasterTcCoCcvRawValue.repRefUnique),
      persCode: new FormControl(hdMasterTcCoCcvRawValue.persCode),
      tenCanBo: new FormControl(hdMasterTcCoCcvRawValue.tenCanBo),
      idCanBo: new FormControl(hdMasterTcCoCcvRawValue.idCanBo),
    });
  }

  getHdMasterTcCoCcv(form: HdMasterTcCoCcvFormGroup): IHdMasterTcCoCcv | NewHdMasterTcCoCcv {
    return form.getRawValue() as IHdMasterTcCoCcv | NewHdMasterTcCoCcv;
  }

  resetForm(form: HdMasterTcCoCcvFormGroup, hdMasterTcCoCcv: HdMasterTcCoCcvFormGroupInput): void {
    const hdMasterTcCoCcvRawValue = { ...this.getFormDefaults(), ...hdMasterTcCoCcv };
    form.reset(
      {
        ...hdMasterTcCoCcvRawValue,
        id: { value: hdMasterTcCoCcvRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): HdMasterTcCoCcvFormDefaults {
    return {
      id: null,
    };
  }
}

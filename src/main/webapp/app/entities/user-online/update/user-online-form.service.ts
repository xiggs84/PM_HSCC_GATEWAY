import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IUserOnline, NewUserOnline } from '../user-online.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IUserOnline for edit and NewUserOnlineFormGroupInput for create.
 */
type UserOnlineFormGroupInput = IUserOnline | PartialWithRequiredKeyOf<NewUserOnline>;

type UserOnlineFormDefaults = Pick<NewUserOnline, 'id'>;

type UserOnlineFormGroupContent = {
  id: FormControl<IUserOnline['id'] | NewUserOnline['id']>;
  sessionId: FormControl<IUserOnline['sessionId']>;
  time: FormControl<IUserOnline['time']>;
  browser: FormControl<IUserOnline['browser']>;
};

export type UserOnlineFormGroup = FormGroup<UserOnlineFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class UserOnlineFormService {
  createUserOnlineFormGroup(userOnline: UserOnlineFormGroupInput = { id: null }): UserOnlineFormGroup {
    const userOnlineRawValue = {
      ...this.getFormDefaults(),
      ...userOnline,
    };
    return new FormGroup<UserOnlineFormGroupContent>({
      id: new FormControl(
        { value: userOnlineRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      sessionId: new FormControl(userOnlineRawValue.sessionId),
      time: new FormControl(userOnlineRawValue.time),
      browser: new FormControl(userOnlineRawValue.browser),
    });
  }

  getUserOnline(form: UserOnlineFormGroup): IUserOnline | NewUserOnline {
    return form.getRawValue() as IUserOnline | NewUserOnline;
  }

  resetForm(form: UserOnlineFormGroup, userOnline: UserOnlineFormGroupInput): void {
    const userOnlineRawValue = { ...this.getFormDefaults(), ...userOnline };
    form.reset(
      {
        ...userOnlineRawValue,
        id: { value: userOnlineRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): UserOnlineFormDefaults {
    return {
      id: null,
    };
  }
}

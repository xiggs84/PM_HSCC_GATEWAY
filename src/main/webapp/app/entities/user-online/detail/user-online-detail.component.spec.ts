import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { UserOnlineDetailComponent } from './user-online-detail.component';

describe('UserOnline Management Detail Component', () => {
  let comp: UserOnlineDetailComponent;
  let fixture: ComponentFixture<UserOnlineDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserOnlineDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: UserOnlineDetailComponent,
              resolve: { userOnline: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(UserOnlineDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOnlineDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load userOnline on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', UserOnlineDetailComponent);

      // THEN
      expect(instance.userOnline()).toEqual(expect.objectContaining({ id: 123 }));
    });
  });

  describe('PreviousState', () => {
    it('Should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});

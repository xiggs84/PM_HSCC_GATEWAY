import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { ThuaTachDetailComponent } from './thua-tach-detail.component';

describe('ThuaTach Management Detail Component', () => {
  let comp: ThuaTachDetailComponent;
  let fixture: ComponentFixture<ThuaTachDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThuaTachDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: ThuaTachDetailComponent,
              resolve: { thuaTach: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ThuaTachDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThuaTachDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load thuaTach on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ThuaTachDetailComponent);

      // THEN
      expect(instance.thuaTach()).toEqual(expect.objectContaining({ id: 123 }));
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

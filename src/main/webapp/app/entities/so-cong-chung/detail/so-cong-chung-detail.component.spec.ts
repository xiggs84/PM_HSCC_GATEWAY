import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { SoCongChungDetailComponent } from './so-cong-chung-detail.component';

describe('SoCongChung Management Detail Component', () => {
  let comp: SoCongChungDetailComponent;
  let fixture: ComponentFixture<SoCongChungDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoCongChungDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: SoCongChungDetailComponent,
              resolve: { soCongChung: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(SoCongChungDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoCongChungDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load soCongChung on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', SoCongChungDetailComponent);

      // THEN
      expect(instance.soCongChung()).toEqual(expect.objectContaining({ id: 123 }));
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

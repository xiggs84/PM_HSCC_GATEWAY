import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { HopDongCongChungDetailComponent } from './hop-dong-cong-chung-detail.component';

describe('HopDongCongChung Management Detail Component', () => {
  let comp: HopDongCongChungDetailComponent;
  let fixture: ComponentFixture<HopDongCongChungDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HopDongCongChungDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: HopDongCongChungDetailComponent,
              resolve: { hopDongCongChung: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(HopDongCongChungDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HopDongCongChungDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load hopDongCongChung on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', HopDongCongChungDetailComponent);

      // THEN
      expect(instance.hopDongCongChung()).toEqual(expect.objectContaining({ id: 123 }));
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

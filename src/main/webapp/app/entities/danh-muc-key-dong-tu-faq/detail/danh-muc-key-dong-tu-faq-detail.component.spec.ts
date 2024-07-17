import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhMucKeyDongTuFaqDetailComponent } from './danh-muc-key-dong-tu-faq-detail.component';

describe('DanhMucKeyDongTuFaq Management Detail Component', () => {
  let comp: DanhMucKeyDongTuFaqDetailComponent;
  let fixture: ComponentFixture<DanhMucKeyDongTuFaqDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhMucKeyDongTuFaqDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DanhMucKeyDongTuFaqDetailComponent,
              resolve: { danhMucKeyDongTuFaq: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhMucKeyDongTuFaqDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucKeyDongTuFaqDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhMucKeyDongTuFaq on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhMucKeyDongTuFaqDetailComponent);

      // THEN
      expect(instance.danhMucKeyDongTuFaq()).toEqual(expect.objectContaining({ id: 123 }));
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

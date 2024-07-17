import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhMucKeyDanhTuFaqDetailComponent } from './danh-muc-key-danh-tu-faq-detail.component';

describe('DanhMucKeyDanhTuFaq Management Detail Component', () => {
  let comp: DanhMucKeyDanhTuFaqDetailComponent;
  let fixture: ComponentFixture<DanhMucKeyDanhTuFaqDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhMucKeyDanhTuFaqDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DanhMucKeyDanhTuFaqDetailComponent,
              resolve: { danhMucKeyDanhTuFaq: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhMucKeyDanhTuFaqDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucKeyDanhTuFaqDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhMucKeyDanhTuFaq on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhMucKeyDanhTuFaqDetailComponent);

      // THEN
      expect(instance.danhMucKeyDanhTuFaq()).toEqual(expect.objectContaining({ id: 123 }));
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

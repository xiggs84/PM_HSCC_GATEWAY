import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { CauHinhThongTinLoaiTaiSanDetailComponent } from './cau-hinh-thong-tin-loai-tai-san-detail.component';

describe('CauHinhThongTinLoaiTaiSan Management Detail Component', () => {
  let comp: CauHinhThongTinLoaiTaiSanDetailComponent;
  let fixture: ComponentFixture<CauHinhThongTinLoaiTaiSanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CauHinhThongTinLoaiTaiSanDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: CauHinhThongTinLoaiTaiSanDetailComponent,
              resolve: { cauHinhThongTinLoaiTaiSan: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CauHinhThongTinLoaiTaiSanDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CauHinhThongTinLoaiTaiSanDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load cauHinhThongTinLoaiTaiSan on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CauHinhThongTinLoaiTaiSanDetailComponent);

      // THEN
      expect(instance.cauHinhThongTinLoaiTaiSan()).toEqual(expect.objectContaining({ id: 123 }));
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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { CauHinhThongTinDuongSuDetailComponent } from './cau-hinh-thong-tin-duong-su-detail.component';

describe('CauHinhThongTinDuongSu Management Detail Component', () => {
  let comp: CauHinhThongTinDuongSuDetailComponent;
  let fixture: ComponentFixture<CauHinhThongTinDuongSuDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CauHinhThongTinDuongSuDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: CauHinhThongTinDuongSuDetailComponent,
              resolve: { cauHinhThongTinDuongSu: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CauHinhThongTinDuongSuDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CauHinhThongTinDuongSuDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load cauHinhThongTinDuongSu on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CauHinhThongTinDuongSuDetailComponent);

      // THEN
      expect(instance.cauHinhThongTinDuongSu()).toEqual(expect.objectContaining({ id: 123 }));
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

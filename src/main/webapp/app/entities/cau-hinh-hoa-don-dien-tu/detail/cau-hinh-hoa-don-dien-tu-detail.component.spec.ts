import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { CauHinhHoaDonDienTuDetailComponent } from './cau-hinh-hoa-don-dien-tu-detail.component';

describe('CauHinhHoaDonDienTu Management Detail Component', () => {
  let comp: CauHinhHoaDonDienTuDetailComponent;
  let fixture: ComponentFixture<CauHinhHoaDonDienTuDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CauHinhHoaDonDienTuDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: CauHinhHoaDonDienTuDetailComponent,
              resolve: { cauHinhHoaDonDienTu: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CauHinhHoaDonDienTuDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CauHinhHoaDonDienTuDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load cauHinhHoaDonDienTu on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CauHinhHoaDonDienTuDetailComponent);

      // THEN
      expect(instance.cauHinhHoaDonDienTu()).toEqual(expect.objectContaining({ id: 123 }));
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

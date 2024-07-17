import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { TinhTrangTaiSanDetailComponent } from './tinh-trang-tai-san-detail.component';

describe('TinhTrangTaiSan Management Detail Component', () => {
  let comp: TinhTrangTaiSanDetailComponent;
  let fixture: ComponentFixture<TinhTrangTaiSanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TinhTrangTaiSanDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TinhTrangTaiSanDetailComponent,
              resolve: { tinhTrangTaiSan: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TinhTrangTaiSanDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TinhTrangTaiSanDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load tinhTrangTaiSan on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TinhTrangTaiSanDetailComponent);

      // THEN
      expect(instance.tinhTrangTaiSan()).toEqual(expect.objectContaining({ id: 123 }));
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

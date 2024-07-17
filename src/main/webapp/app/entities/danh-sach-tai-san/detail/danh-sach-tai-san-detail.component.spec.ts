import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhSachTaiSanDetailComponent } from './danh-sach-tai-san-detail.component';

describe('DanhSachTaiSan Management Detail Component', () => {
  let comp: DanhSachTaiSanDetailComponent;
  let fixture: ComponentFixture<DanhSachTaiSanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhSachTaiSanDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DanhSachTaiSanDetailComponent,
              resolve: { danhSachTaiSan: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhSachTaiSanDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachTaiSanDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhSachTaiSan on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhSachTaiSanDetailComponent);

      // THEN
      expect(instance.danhSachTaiSan()).toEqual(expect.objectContaining({ id: 123 }));
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

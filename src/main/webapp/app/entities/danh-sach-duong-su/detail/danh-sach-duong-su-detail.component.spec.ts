import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhSachDuongSuDetailComponent } from './danh-sach-duong-su-detail.component';

describe('DanhSachDuongSu Management Detail Component', () => {
  let comp: DanhSachDuongSuDetailComponent;
  let fixture: ComponentFixture<DanhSachDuongSuDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhSachDuongSuDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DanhSachDuongSuDetailComponent,
              resolve: { danhSachDuongSu: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhSachDuongSuDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachDuongSuDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhSachDuongSu on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhSachDuongSuDetailComponent);

      // THEN
      expect(instance.danhSachDuongSu()).toEqual(expect.objectContaining({ id: 123 }));
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

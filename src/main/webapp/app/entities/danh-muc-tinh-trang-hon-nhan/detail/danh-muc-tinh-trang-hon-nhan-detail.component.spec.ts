import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhMucTinhTrangHonNhanDetailComponent } from './danh-muc-tinh-trang-hon-nhan-detail.component';

describe('DanhMucTinhTrangHonNhan Management Detail Component', () => {
  let comp: DanhMucTinhTrangHonNhanDetailComponent;
  let fixture: ComponentFixture<DanhMucTinhTrangHonNhanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhMucTinhTrangHonNhanDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DanhMucTinhTrangHonNhanDetailComponent,
              resolve: { danhMucTinhTrangHonNhan: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhMucTinhTrangHonNhanDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucTinhTrangHonNhanDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhMucTinhTrangHonNhan on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhMucTinhTrangHonNhanDetailComponent);

      // THEN
      expect(instance.danhMucTinhTrangHonNhan()).toEqual(expect.objectContaining({ id: 123 }));
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
